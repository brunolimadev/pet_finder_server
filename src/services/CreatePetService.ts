import { getRepository } from 'typeorm';
import Pet from '../models/Pet';

interface Request {
  name: string;
  breed: string;
  age: number;
  weight: number;
  image: string;
  user_id: string;
}

class CreatePetService {
  public async execute({
    name,
    breed,
    age,
    weight,
    image,
    user_id,
  }: Request): Promise<Pet> {
    const petsRepository = getRepository(Pet);

    const pet = petsRepository.create({
      name,
      breed,
      age,
      weight,
      image,
      user_id,
    });

    await petsRepository.save(pet);

    return pet;
  }
}

export default CreatePetService;
