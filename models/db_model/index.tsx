export const UserModel={
    fullName:'', //***** e.g Titus Moyo
    dateCreated:'',  // string   () e.g 697328736237
    photoURL:'',  //string   () e.g https:www.hero.jpeg
    phoneNumber:'',  // string  () e.g +27176276373
    uid:'',    // string  () e.g
    email:'',   //string  e.g
    emailVerified:false,  //boolean () e.g
    phoneNumberVerified:false,  //boolean () e.g
    userBlocked:false, // boolean
    threatLevel:0, // int
    adminLevel:0, // int  0-read-only, 3-write, 5-super-user  
};

export interface USERMODEL{
    fullName:string, //***** e.g Titus Moyo
    dateCreated:string,  // string   () e.g 697328736237
    photoURL:string,  //string   () e.g https:www.hero.jpeg
    phoneNumber:string,  // string  () e.g +27176276373
    uid:string,    // string  () e.g
    email:string,   //string  e.g
    emailVerified:boolean,  //boolean () e.g
    phoneNumberVerified:boolean,  //boolean () e.g
    userBlocked:boolean, // boolean
    threatLevel:number, // int
    adminLevel:number, // int  0-read-only, 3-write, 5-super-user  
};

export interface FARMERMODEL{
    firstNameAndSurname:string,
    dayOfBirth:string,
    monthOfBirth:string,
    yearOfBirth:string,
    idNumber:string,
    phoneNumber:string,
    gender:string,
    village:string,
    district:string,
    ward:string,
    language:string,
    farmerId:string,
    latitude:number,
    longitude:number
};

export interface JOBSTATUSMODEL{
    jobType:number, // int   6: , 7:google sign
    jobCaller:number, // int jobCaller indicates the jobType behind the job
    jobName:string,
    jobDescription:string,
    error:boolean,
    errorMessage:string,
    finished:boolean,
    output:string,
    other:boolean,
    otherMessage:string,
    isNewUser:boolean, // google auth signup and login indicator
};


// for all network related tasks
// 1 : realtime database operations
// 2 : storage operations
export const jobStatusModel={
    jobType:-1, // int   6: , 7:google sign
    jobCaller:-1, // int jobCaller indicates the jobType behind the job
    jobName:'',
    jobDescription:'',
    error:false,
    errorMessage:'',
    finished:false,
    output:'',
    other:false,
    otherMessage:'',
    isNewUser:false, // google auth signup and login indicator
};


/* Weather Update model Here */
export interface WEATHERUPDATE{
    id:string,
    type:number,
    title:string,
    htmlContent:string,
    textShortContent:string,
    coverImageUrl:any,
    dateCreated:any,
    postedById:string,
    totalSentNotifications:number,
};

/* Weather Update model Here */
export interface ANNOUNCEMENT{
    id:string,
    type:number,
    title:string,
    htmlContent:string,
    textShortContent:string,
    coverImageUrl:any,
    dateCreated:any,
    postedById:string,
    totalSentNotifications:number,
};


/* Weather Update model Here */
export interface MARKETGUIDE{
    id:string,
    type:number,
    title:string,
    htmlContent:string,
    textShortContent:string,
    coverImageUrl:any,
    dateCreated:any,
    postedById:string,
    totalSentNotifications:number,
};






