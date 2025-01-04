import { FirebaseRepository } from '@/repositories/firebaseRepository';


const mapping = Symbol();

export class RepositoryFactory {
  static [mapping] = {
    firebase : new FirebaseRepository()
  }
  static createRepository(name) {
    if (this[mapping][name] === undefined) {
      throw new Error('concrete instance of repository does not exists');
    }
    return this[mapping][name];
  }
}
