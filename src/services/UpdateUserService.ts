import { getRepository } from 'typeorm';
import { isUuid } from 'uuidv4';
import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
  id: string;
  name: string;
  email: string;
  postal_code: string;
  address: string;
  number: string;
  city: string;
  state: string;
  password: string;
}

class UpdatePetService {
  public async execute({
    id,
    name,
    email,
    postal_code,
    address,
    number,
    city,
    state,
    password,
  }: Request): Promise<User> {
    if (!isUuid(id)) {
      throw new AppError('Invalid ID');
    }

    const usersRepository = getRepository(User);

    const findUser = await usersRepository.findOne({
      where: {
        id,
      },
    });

    if (!findUser) {
      throw new AppError('User not found!');
    }

    findUser.name = name;
    findUser.email = email;
    findUser.postal_code = postal_code;
    findUser.address = address;
    findUser.number = number;
    findUser.city = city;
    findUser.state = state;
    findUser.password = password;

    await usersRepository.save(findUser);

    return findUser;
  }
}

export default UpdatePetService;
