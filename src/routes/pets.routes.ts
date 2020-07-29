import { Router, Request, Response } from 'express';
import { getCustomRepository, getConnection } from 'typeorm';
import multer from 'multer';
import PetsRepository from '../repositories/PetsRepository';
import CreatePetService from '../services/CreatePetService';
import DeletePetService from '../services/DeletePetService';
import UpdatePetService from '../services/UpdatePetService';
import uploadConfig from '../config/upload';

import provideAuthentication from '../middlewares/provideAuthentication';

const petsRouter = Router();
const upload = multer(uploadConfig);

petsRouter.get('/', async (request: Request, response: Response) => {
  const petRepository = getCustomRepository(PetsRepository);
  const pets = await petRepository.find({
    relations: ['user'],
  });

  response.status(200).json(pets);
});

petsRouter.use(provideAuthentication);

petsRouter.post(
  '/',
  upload.single('image'),
  async (request: Request, response: Response) => {
    try {
      const user_id = request.user.id;
      const { name, breed, age, weight } = request.body;
      const image = request.file.filename;
      const createPetService = new CreatePetService();

      const pet = await createPetService.execute({
        name,
        breed,
        age,
        weight,
        image,
        user_id,
      });

      return response.json(pet);
    } catch (err) {
      return response.status(400).json({ message: err.message });
    }
  },
);

petsRouter.delete('/:id', async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const deletePetService = new DeletePetService();

    await deletePetService.execute({ id });
    response.status(204).json({});
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

petsRouter.put(
  '/',
  upload.single('image'),
  async (request: Request, response: Response) => {
    try {
      const { id, name, breed, age, weight } = request.body;
      const image = request.file.filename;
      const updatePetService = new UpdatePetService();

      const pet = await updatePetService.execute({
        id,
        name,
        breed,
        age,
        weight,
        image,
      });

      return response.json(pet);
    } catch (err) {
      return response.status(400).json({ message: err.message });
    }
  },
);

export default petsRouter;
