import { getRepository } from 'typeorm';
import { hash } from 'bcrypt';
import User from '../models/User';

interface Request {
  name: string;
  email: string;
  postalCode: string;
  address: string;
  number: number;
  city: string;
  state: string;
  password: string;
}

class CreateUserService {
  public async execute({
    name,
    email,
    postalCode,
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
      throw new Error('Email address already used');
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      postalCode,
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
