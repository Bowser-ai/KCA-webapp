import { app } from "@/utils/firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  InvalidUserName,
  InvalidPassword,
  UnknownError,
} from "@/authentication/authError";

const auth = getAuth(app);

function getError(code) {
  switch (code) {
    case "auth/invalid-email":
    case "auth/user-not-found":
      return new InvalidUserName("Invalid username was entered.");
    case "auth/wrong-password":
      return new InvalidPassword("Invalid password was entered.");
    default:
      return new UnknownError("Something unexpected occurred.");
  }
}

export default {
  async login(username, password) {
    try {
      await signInWithEmailAndPassword(auth, username, password);
    } catch (e) {
      console.error(e);
      throw getError(e.code);
    }
  },
  async logout() {
    try {
      await signOut(auth);
    } catch (e) {
      console.error(e);
      throw getError(e.code);
    }
  },
  onAuthenticatedUser(cb) {
    onAuthStateChanged(auth, cb);
  },
};
