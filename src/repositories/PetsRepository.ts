import { EntityRepository, Repository } from 'typeorm';
import Pet from '../models/Pet';

@EntityRepository(Pet)
class PetRepository extends Repository<Pet> {
  // public async findByLocate(city: string): Promise<Pet[] | null> {
  //   // const findPets = await this.find({
  //   // })
  // }
}

export default PetRepository;
