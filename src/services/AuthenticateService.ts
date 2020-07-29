import { getRepository } from 'typeorm';
import { compare } from 'bcrypt';
import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
  email: string;
  password: string;
}

class AuthenticateService {
  public async execute({ email, password }: Request): Promise<{ user: User }> {
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

    if (!passwordMatched) {
      throw new AppError('Incorrect email or password.');
    }

    return {
      user,
    };
  }
}

export default AuthenticateService;
