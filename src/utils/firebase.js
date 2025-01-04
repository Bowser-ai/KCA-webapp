import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { firebaseConfig } from "@/utils/firebaseConfig";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export {
    app,
    db, 
};
