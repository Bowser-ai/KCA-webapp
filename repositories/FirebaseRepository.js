import { BaseRepository } from '@/repositories/BaseRepository';
import db from '@/utils/firebase';


export class FirebaseRepository extends BaseRepository {
  async getAllFilialen() {
    const snapshot = await db.ref().once('value');
    if (!snapshot.exists()) throw new Error('database error, try again later');
    const filialen = await snapshot.val();
    return filialen;
  }
  async addMededeling(filiaal) {
    const snapshot = await db.ref()
      .orderByChild('filiaalnummer')
      .equalTo(filiaal.filiaalnummer)
      .once('value');

    if (!snapshot.exists()) {
      throw new Error('filiaal niet gevonden in de database');
    }

    await db.ref(Object.keys(snapshot.val())[0]).update(filiaal);
  }
}
