import { getRepository } from 'typeorm';
import { isUuid } from 'uuidv4';
import path from 'path';
import fs from 'fs';
import Pet from '../models/Pet';
import AppError from '../errors/AppError';
import uploadConfig from '../config/upload';

interface Request {
  id: string;
}

class DeletePetService {
  public async execute({ id }: Request): Promise<void> {
    if (!isUuid(id)) {
      throw new AppError('Invalid ID');
    }

    const petsRepository = getRepository(Pet);

    const pet = await petsRepository.findOne({
      where: {
        id,
      },
    });

    if (!pet) {
      throw new AppError('Pet not found!');
    }

    const petImage = path.join(uploadConfig.directory, pet.image);

    await fs.promises.unlink(petImage);

    await petsRepository.delete(id);
  }
}

export default DeletePetService;
