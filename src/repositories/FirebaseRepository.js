import { BaseRepository } from "@/repositories/BaseRepository";
import { db } from "@/utils/firebase";
import {
  ref,
  child,
  get,
  query,
  orderByChild,
  equalTo,
  update,
} from "firebase/database";

export class FirebaseRepository extends BaseRepository {
  async getAllFilialen() {
    const snapshot = await get(child(ref(db), "/"));
    if (!snapshot.exists()) throw new Error("database error, try again later");
    const filialen = await snapshot.val();
    return filialen;
  }
  async addMededeling(filiaal) {
    const snapShot = await get(
      query(
        ref(db),
        orderByChild("filiaalnummer"),
        equalTo(filiaal.filiaalnummer)
      )
    );

    if (!snapShot.exists) {
      throw new Error(
        `Database error, updating failed node with number: ${filiaal.filiaalnummer} not found.`
      );
    }

    const key = Object.keys(snapShot.val())[0];

    await update(ref(db), { [key]: filiaal });
  }
}
