import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { firebaseConfig } from "@/utils/firebaseConfig";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const login = (username, password) => signInWithEmailAndPassword(auth, username, password);
const logout = () => signOut(auth);
const onCurrentUser = cb => onAuthStateChanged(auth, user => cb(user));
export {
    db, 
    login,
    logout,
    onCurrentUser,
};
