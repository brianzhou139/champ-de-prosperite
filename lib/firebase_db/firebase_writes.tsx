import {initFirebase} from "@lib/firebase_db/firebase_init";
import { getDatabase,update, ref, child,set,push} from "firebase/database";
import { jobStatusModel } from '@models/db_model';
import { serverTimestamp } from 'firebase/database';

// save Db User
export const saveDbUser= async (path:any,dbuser:any,callback:any)=>{
  let jobStatus=jobStatusModel;
  jobStatus.jobDescription="saving data to realtime database path "+path;

  //const datecreated = new Date().getTime();
  dbuser.dateCreated = serverTimestamp();

  //console.log(post);
  const db = getDatabase();

  set(ref(db, path),dbuser)
  .then((res)=>{
      jobStatus.finished=true;
      callback(jobStatus,dbuser);
      //console.log(res.val());
  })
  .catch((error)=>{
    console.log("error catch saveDbUser");
    console.log(error);
    alert(error);
    jobStatus.error=true;
    callback(jobStatus,dbuser);
  })
}


// save product data
export const postObjectData= async (path:any,objectData:any,callback:any)=>{
    initFirebase();
    
    let jobStatus=jobStatusModel;
    jobStatus.jobDescription="saving product to product_data "+path;

    //const datecreated = new Date().getTime();
    objectData.dateCreated = serverTimestamp();
  
    //console.log(post);
    const db = getDatabase();

    const productsRef = ref(db, path);
    const newProductRef = push(productsRef);
    const newKey = newProductRef.key;

    objectData.id=newKey??'';

    set(newProductRef,objectData)
    .then((res)=>{
        jobStatus.finished=true;
        callback(jobStatus,objectData);
        //console.log(res.val());
    })
    .catch((error)=>{
      console.log("error catch saveDbUser");
      console.log(error);
      alert(error);
      jobStatus.error=true;
      callback(jobStatus,objectData);
    })
}

  

/*
*
*/
export const updateDBNode= async (path:string,changesData:any)=>{
  await initFirebase();
  let jobStatus=jobStatusModel;
  const db = getDatabase();

  update(ref(db,path),changesData)
  .then((res) => {
    // Update the isLoading state and navigate to the home page.
    //router.push('/');
    console.log("zmUpdateNode: success");
    jobStatus.output="job well done";
    jobStatus.finished=true;
  })
  .catch((error) => {
    // Alert the error and update the isLoading state.
    let errorMessage=error.errorMessage;
    jobStatus.finished=false;
    jobStatus.error=true;
    jobStatus.errorMessage=errorMessage;
  });
}


/*
Deletes a post from the database.
*/
export const deletePathFromFbDb = async (path:string) => {
  initFirebase();
  //return firebase.database().ref(`/posts/${slug}`).set(null);
  const db = getDatabase();
  return set(ref(db,path),null);
};



