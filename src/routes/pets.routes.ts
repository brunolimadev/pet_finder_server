import { Router, Request, Response } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import multer from 'multer';
import PetsRepository from '../repositories/PetsRepository';
import CreatePetService from '../services/CreatePetService';
import DeletePetService from '../services/DeletePetService';
import UpdatePetService from '../services/UpdatePetService';
import uploadConfig from '../config/upload';

import User from '../models/User';
import Pet from '../models/Pet';

import provideAuthentication from '../middlewares/provideAuthentication';

const petsRouter = Router();
const upload = multer(uploadConfig);

petsRouter.get('/', async (request: Request, response: Response) => {
  const petsRepository = getCustomRepository(PetsRepository);
  const pets = await petsRepository.find();
  response.status(200).json(pets);
});

petsRouter.get(
  '/search/:pet_id',
  async (request: Request, response: Response) => {
    try {
      const { pet_id } = request.params;
      const petRepository = getCustomRepository(PetsRepository);
      const findPet = await petRepository.findOne(pet_id, {
        relations: ['user'],
      });

      if (findPet) {
        delete findPet.user.password;
      }

      response.json(findPet);
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  },
);

petsRouter.use(provideAuthentication);

petsRouter.get('/custom', async (request: Request, response: Response) => {
  try {
    const { id } = request.user;
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(id);

    if (user) {
      const pets = await getRepository(Pet)
        .createQueryBuilder('pet')
        .innerJoin('pet.user', 'user')
        .where('user.city = :city', { city: user.city })
        .getMany();

      response.json(pets);
    }
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

petsRouter.get('/mypets', async (request: Request, response: Response) => {
  try {
    const { id } = request.user;
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(id);

    if (user) {
      const findPets = await userRepository.find({
        relations: ['pets'],
        select: ['name'],
        where: {
          id: user.id,
        },
      });

      response.json(findPets);
    }
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

petsRouter.get('/', async (request: Request, response: Response) => {
  const petRepository = getCustomRepository(PetsRepository);
  const pets = await petRepository.find();

  response.status(200).json(pets);
});

petsRouter.post(
  '/',
  upload.single('image'),
  async (request: Request, response: Response) => {
    try {
      const user_id = request.user.id;
      const { name, breed, age, weight, type } = request.body;
      const image = request.file.filename;
      const createPetService = new CreatePetService();

      const pet = await createPetService.execute({
        name,
        breed,
        age,
        weight,
        image,
        type,
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
      const { id, name, breed, age, weight, type } = request.body;
      const image = request.file ? request.file.filename : '';
      const updatePetService = new UpdatePetService();

      const pet = await updatePetService.execute({
        id,
        name,
        breed,
        age,
        weight,
        type,
        image,
      });

      return response.json(pet);
    } catch (err) {
      return response.status(400).json({ message: err.message });
    }
  },
);

export default petsRouter;
