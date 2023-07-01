

/**
 * takes an html string and returns text,first n words only
 * 
 * @param value 
 * 
 * @param totalFirstWords 
 * @returns 
 */
export const getTextFromHtml = (value:string,n:number):string=>{
    
    const parser = new DOMParser();
    const htmlDocument = parser.parseFromString(value, 'text/html');
    const plainTextDescription:string = htmlDocument.body.textContent??'';
    const wordsList = plainTextDescription.split(' ');
    const firstNWords = wordsList.slice(0,n).join(' ');
    return firstNWords;

}// end of getTextFromHtml 


/*
  returns the file size in MB
  input : sizeInBytes
*/
export const getFileSizeMb=(sizeInBytes:number):number=>{
    let result:number = Number((sizeInBytes / (1024*1024)).toFixed(2));
    return result;
  }


/**
 * Checks if the file is an image
 *
 */
export const isThisAnImage=(fileName: string,exts: any[])=>{
    return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(fileName);
}

/*returns datae from timestamp */
export const getDayDateYearFromTimestamp=(dateCreated:string)=>{
  const date = new Date(dateCreated).toLocaleDateString("en-US"); 
  return date;
}

/**Checks for user rights */
export const userOnlyHasReadRights=(admin:any)=>{
  if(admin===null){
    return;
  };
  if(admin["adminLevel"]===0){
    return true;
  }
  return false;
}

/** Checks for user rights  :::: */
export const userHasWriteAccess=(admin:any)=>{
  if(admin===null){
    return;
  };
  if(admin["adminLevel"]===3 || admin["adminLevel"]===5){
    return true;
  }
  return false;
}

/**Checks for user rights */
export const userIsRootUser=(admin:any)=>{
  if(admin===null){
    return;
  };
  if(admin["adminLevel"]===5){
    return true;
  }
  return false;
}


/**Checks for user rights */
export const isThisMe=(listed_id:string,dbuser:any)=>{
  if(dbuser===null){
    return;
  }
  if(dbuser["uid"]===listed_id){
    return true;
  }
  return false;
}

