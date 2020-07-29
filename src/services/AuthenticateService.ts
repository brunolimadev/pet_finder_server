import { getRepository } from 'typeorm';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import User from '../models/User';
import AppError from '../errors/AppError';
import authConfig from '../config/auth';

interface Request {
  email: string;
  password: string;
}

class AuthenticateService {
  public async execute({
    email,
    password,
  }: Request): Promise<{ user: User; token: string }> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new AppError('Incorrect email or password.');
    }

    const passwordMatched = await compare(password, user.password);

    const { secret, expires } = authConfig.jwt;

    // payload, secret, configs
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn: expires,
    });

    if (!passwordMatched) {
      throw new AppError('Incorrect email or password.');
    }

    return {
      user,
      token,
    };
  }
}

export default AuthenticateService;
