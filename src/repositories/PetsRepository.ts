import { EntityRepository, Repository, getRepository } from 'typeorm';
import Pet from '../models/Pet';
import User from '../models/User';

@EntityRepository(Pet)
class PetRepository extends Repository<Pet> {}

export default PetRepository;
