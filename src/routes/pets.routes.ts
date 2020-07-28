import { Router, Request, Response } from 'express';

const petsRouter = Router();

petsRouter.get('/', (request: Request, response: Response) => {
  response.send('Teste ok');
});

export default petsRouter;
