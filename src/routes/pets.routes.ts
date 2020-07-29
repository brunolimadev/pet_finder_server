import { Router, Request, Response } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

const petsRouter = Router();

// Rota para a listagem de todos os pets
petsRouter.get('/', (request: Request, response: Response) => {
  response.send('Teste ok');
});

export default petsRouter;
