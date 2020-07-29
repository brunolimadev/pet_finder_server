import { Router, Request, Response } from 'express';

const usersRouter = Router();

usersRouter.post('/', (request: Request, response: Response) => {
  const {
    name,
    email,
    postalCode,
    address,
    number,
    city,
    state,
    password,
  } = request.body;
});

export default usersRouter;
