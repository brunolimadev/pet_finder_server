import { Router, Request, Response } from 'express';

const petsRouter = Router();

// Rota para a listagem de todos os pets
petsRouter.get('/', (request: Request, response: Response) => {
  response.send('Teste ok');
});

export default petsRouter;
