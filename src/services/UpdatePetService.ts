import { getRepository } from 'typeorm';
import { isUuid } from 'uuidv4';
import Pet from '../models/Pet';
import AppError from '../errors/AppError';

interface Request {
  id: string;
  name: string;
  breed: string;
  age: number;
  weight: number;
  image: string;
}

class UpdatePetService {
  public async execute({
    id,
    name,
    breed,
    age,
    weight,
    image,
  }: Request): Promise<Pet> {
    if (!isUuid(id)) {
      throw new AppError('Invalid ID');
    }

    const petsRepository = getRepository(Pet);

    const findPet = await petsRepository.findOne({
      where: {
        id,
      },
    });

    if (!findPet) {
      throw new AppError('Pet not found!');
    }

    findPet.name = name;
    findPet.breed = breed;
    findPet.age = age;
    findPet.weight = weight;
    findPet.image = image;

    await petsRepository.save(findPet);

    return findPet;
  }
}

export default UpdatePetService;
