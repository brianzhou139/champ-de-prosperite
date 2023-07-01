import {initFirebase} from "@lib/firebase_db/firebase_init";
import { getDatabase, ref, child,get,push} from "firebase/database";
import { jobStatusModel } from '@models/db_model';
import { serverTimestamp } from 'firebase/database';

// pathToValue
export const getChildValue = async (pathToValue:string) => {
    initFirebase();
    const db = getDatabase();
    //const auth = getAuth();
    const dbRef = ref(getDatabase());
  
    return get(child(dbRef,pathToValue)).then((snapshot) => {
      return snapshot.val();
    }).catch((error) => {
      console.error(error);
    });
};



