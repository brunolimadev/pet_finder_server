import { getRepository } from 'typeorm';
import { isUuid } from 'uuidv4';
import path from 'path';
import fs from 'fs';
import Pet from '../models/Pet';
import AppError from '../errors/AppError';
import uploadConfig from '../config/upload';

interface Request {
  id: string;
  name: string;
  breed: string;
  age: number;
  weight: number;
  image: string;
  type: 'cachorro' | 'gato';
}

class UpdatePetService {
  public async execute({
    id,
    name,
    breed,
    age,
    weight,
    image,
    type,
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

    if (image.length > 0) {
      const petImage = path.join(uploadConfig.directory, findPet.image);
      await fs.promises.unlink(petImage);
    }

    findPet.name = name;
    findPet.breed = breed;
    findPet.age = age;
    findPet.weight = weight;
    findPet.image = image.length > 0 ? image : findPet.image;
    findPet.type = type;

    await petsRepository.save(findPet);

    return findPet;
  }
}

export default UpdatePetService;
