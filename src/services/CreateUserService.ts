import { getRepository } from 'typeorm';
import { hash } from 'bcrypt';
import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
  name: string;
  email: string;
  postal_code: string;
  address: string;
  number: string;
  city: string;
  state: string;
  password: string;
}

class CreateUserService {
  public async execute({
    name,
    email,
    postal_code,
    address,
    number,
    city,
    state,
    password,
  }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const checkUserExists = await userRepository.findOne({
      email,
    });

    if (checkUserExists) {
      throw new AppError('User already exists');
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      postal_code,
      address,
      number,
      city,
      state,
      password: hashedPassword,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
