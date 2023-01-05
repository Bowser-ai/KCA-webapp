import { FilialenRepository } from '@/repositories/FilialenRepository';


const mapping = Symbol();

export class RepositoryFactory {
  static [mapping] = {
    filialen: new FilialenRepository(),
  }
  static createRepository(name) {
    if (this[mapping][name] === undefined) {
      throw new Error('concrete instance of repository does not exists');
    }
    return this[mapping][name];
  }
}
