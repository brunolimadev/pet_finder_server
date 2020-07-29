import { Router, Request, Response } from 'express';
import multer from 'multer';
import CreatePetService from '../services/CreatePetService';
import uploadConfig from '../config/upload';

import provideAuthentication from '../middlewares/provideAuthentication';

const petsRouter = Router();
const upload = multer(uploadConfig);

petsRouter.get('/', (request: Request, response: Response) => {
  response.status(200).json({ message: true });
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

export default petsRouter;
