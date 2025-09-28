import Head from 'next/head'
import Image from 'next/image'
import Layout from '@components/Containers/Layout';
import { Button } from '@windmill/react-ui'
import { useState,useEffect,useRef } from 'react';
import { useRouter } from 'next/router';
import RichTextEditor from '@components/TextEditor';
import { getTextFromHtml } from '@utils/functions/utils_functions';
import { sendNotificationToBackend } from '@lib/firebase_fcm/notifications';
import { WEATHERUPDATE } from '@models/db_model';
import { postObjectData } from '@lib/firebase_db/firebase_writes';
import { get_REAL_TIME_DB_BASE } from '@utils/constants/db_constants';
import { JOBSTATUSMODEL } from '@models/db_model';
import { getFileSizeMb,isThisAnImage } from '@utils/functions/utils_functions';
import { STORAGE_IMAGE_MAXIMUM_SIZE,ALLOWED_IMAGE_EXTENSIONS } from '@utils/constants/db_constants';
import { v4 as uuidv4 } from 'uuid';
import { CrossIcon, TrashIcon,WomenDayIcon } from '@icons'
import { makeAnUploadToFirebasStorage } from '@lib/firebase_db/firebase_storage';
import { FB_STORAGE_PRODUCT__IMAGE } from '@utils/constants/db_constants';
import { JOB_TYPE_UPLOAD_FILE_TO_STORAGE } from '@utils/constants/job_constants';
import {initFirebase} from "@lib/firebase_db/firebase_init";
import { getDatabase, ref,onValue,set,push} from "firebase/database";
import { getDayDateYearFromTimestamp } from '@utils/functions/utils_functions';
import { deletePathFromFbDb } from '@lib/firebase_db/firebase_writes';
import { child, get, query, orderByChild} from "firebase/database";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '@context/auth';
import { userOnlyHasReadRights } from '@utils/functions/utils_functions';
import { UNAUTHORISED_WRITE_ACCESS_MESSAGE } from '@utils/constants/warning_constants';


export default function Home() {
  const router = useRouter();
  const {user,dbuser,userLoading} = useAuth();
  const DB_BASE_PATH=get_REAL_TIME_DB_BASE(router.pathname);

  const [value, onChange] = useState('');
  const [title, setTitle] = useState('');
  const [topic,setTopic]=useState('weather_update');
  const [tabNumber,setTabNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [mediaFile,setMediaFile]=useState(null);
  const [fileKey,setFileKey]=useState("default");
  const [uploadProgress,setUploadProgress]=useState(null);

  const [ weatherUpdatesList, setWeatherUpdatesList] = useState<WEATHERUPDATE[]>([]);
  const initialWeatherUpdatesList = useRef<WEATHERUPDATE[]>([]);
  const [ effectCalmer,setEffectCalmer]=useState(null);


  useEffect(() => {
    // listening for changes in product cart
    // console.log(user);
     (async () => {
         if(true){
             initFirebase();
             const db = getDatabase();

             const orderedRef = query(ref(db,DB_BASE_PATH), orderByChild('dateCreated'));
             //const cartProdRef = ref(db,DB_BASE_PATH);

             onValue(orderedRef, (snapshot) => {
               //console.log(data);
               //const data = snapshot.val();
               //console.log(data);
               let tempList:WEATHERUPDATE[]=[];
               snapshot.forEach((child)=>{
                let kidValue=child.val();
                console.log(kidValue);
                tempList.push(kidValue);
               })

               tempList=tempList.reverse();

               if (JSON.stringify(tempList) !== JSON.stringify(initialWeatherUpdatesList.current)) {
                setWeatherUpdatesList(tempList);
                initialWeatherUpdatesList.current = tempList;
               }
               //setWeatherUpdatesList(tempList);
             });
         }
     })();

},[effectCalmer]);

  const handleTitleChange = (e: { target: { id: any; value: any; }; }) => {
    const id = e.target.id;
    const newValue = e.target.value;
    setTitle(newValue);
  };
  // handles file changes
  const handleFileChange=async(e: { target: any; })=>{
    const target = e.target;
    const file = target.files[0];
    const name = target.name;

    if(file===undefined){
        return;
    }

    console.log(file);
    const fileSize:number = getFileSizeMb(file.size);
    if(fileSize>STORAGE_IMAGE_MAXIMUM_SIZE){
      alert("The image must be less than "+STORAGE_IMAGE_MAXIMUM_SIZE+" mb");
      return;
    }
    if(!isThisAnImage(file.name,ALLOWED_IMAGE_EXTENSIONS)){
        alert('Only images are allowed');
        return;
    }
    // setting the mediaFile
    setMediaFile(file);
  }

  const resetFileInput=()=>{
    setFileKey(uuidv4());
    setMediaFile(null);
  }



  const handlePostButtonClick=()=>{
    if(dbuser==null){
      return;
    }

    if(userOnlyHasReadRights(dbuser)){
      alert(UNAUTHORISED_WRITE_ACCESS_MESSAGE);
      return;
    }
    
    if(title.trim().length===0){
      alert("Fill in the Title");
      return;
    }
    if(value.trim().length===0){
      alert("Fill in the Content");
      return;
    }

    console.log("submit clicked");
    console.log(value);

    const firstTwentyWords = getTextFromHtml(value,20);

    // send data to db
    let db_path=DB_BASE_PATH;

    let weatherUpdate:WEATHERUPDATE={
      id:'',
      type:0,
      title:title,
      htmlContent:value,
      textShortContent:getTextFromHtml(value,30),
      coverImageUrl:'',
      dateCreated:'',
      postedById:'',
      totalSentNotifications:0,
    };

    if(mediaFile===null){
      postObjectData(db_path,weatherUpdate,receiverRealTimeDbResults);
    }else{
      console.log("mediaFile is not empty");

      // getting the filex extension
      let ext:string = mediaFile['name'];
      let file_extension:string = ext.split(".")[1];

      let file_id = uuidv4();
      let path = FB_STORAGE_PRODUCT__IMAGE+file_id+"."+file_extension;

      // makeAnUploadToFirebasStorage = async (path:string,file: any,productData:PRODUCTMODEL,{setUploadProgress}: any,callbac)
      makeAnUploadToFirebasStorage(path,mediaFile,weatherUpdate,{setUploadProgress},receiverUploadResults);
    }
    //postObjectData(db_path,weatherUpdate,receiverRealTimeDbResults);
    
  }//end of handlePostButtonClick

  // receiver results from upload activity
  const receiverUploadResults=(jobStatus:JOBSTATUSMODEL,objectData:any)=>{
    console.log(jobStatus);
    // check if the file was successfully uploaded
    if(jobStatus.finished && jobStatus.jobType===JOB_TYPE_UPLOAD_FILE_TO_STORAGE){
        // changing the type to 1
        objectData.type=1;
        postObjectData(DB_BASE_PATH,objectData,receiverRealTimeDbResults);
    }else{
      setIsLoading(false);
      resetFileInput();
    }
  }


  // receiver results RealTime database SaveData
  const receiverRealTimeDbResults=(jobStatus:JOBSTATUSMODEL,dataObject:any)=>{
    setIsLoading(false);

    console.log(jobStatus);
    // check if job was done properly
    if(jobStatus.finished){
      console.log("data saved successfully oops *** ici Zoust");
      onChange('');
      setTitle('');

      const firstTwentyWords = getTextFromHtml(dataObject.htmlContent,20);
      sendNotificationToBackend(DB_BASE_PATH,dataObject.id,dataObject.title,firstTwentyWords,topic);

    }else if(jobStatus.error){
      // handle error
    }
    resetFileInput();
  }

  const handleOnDelete=(item:WEATHERUPDATE)=>{

    if(dbuser==null){
      return;
    }

    if(userOnlyHasReadRights(dbuser)){
      alert(UNAUTHORISED_WRITE_ACCESS_MESSAGE);
      return;
    }
    
    const removeProduct = confirm(
      'Are you sure you want to delete this post?, this operation is irreversible and will remove this post from the database.',
    );
    if (removeProduct) {
      let path:string = DB_BASE_PATH+item.id;
      
      deletePathFromFbDb(path);
    }
  }

  const sendNotificationAgain=(item:WEATHERUPDATE)=>{
    if(dbuser==null){
      return;
    }

    if(userOnlyHasReadRights(dbuser)){
      alert(UNAUTHORISED_WRITE_ACCESS_MESSAGE);
      return;
    }

    const firstTwentyWords = getTextFromHtml(item.htmlContent,20);

    if(item.totalSentNotifications===0){
      sendNotificationToBackend(DB_BASE_PATH,item.id,item.title,firstTwentyWords,topic);
      return;
    }

    let msg="";
    if(item.totalSentNotifications===1){
      msg="A notification for this update was sent before, ";
    }else if(item.totalSentNotifications>1){
      msg=item.totalSentNotifications+" notifications have been sent before for this update, ";
    }else{
      msg="";
    }

    const shouldSendNotification = confirm(
      msg+'Are you sure you want to send another push notification?',
    );
    if (shouldSendNotification) {
      sendNotificationToBackend(DB_BASE_PATH,item.id,item.title,firstTwentyWords,topic);
    }
  }

  /** Show Toast Notification */
  const showToast=(msg:string)=>{
    toast(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });  
  }




  return (
    <Layout>

      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
          {/*List of Options */}
          <div className='flex  items-center bg-slate-50 dark:text-slate-400 dark:bg-slate-800'>
            
            <div
              onClick={()=>{setTabNumber(0);}}
              className={`${tabNumber===0 ? 'border-b-4 border-b-green-400 text-black':''} text-slate-500  px-10 p-2 font-medium hover:cursor-pointer`}>
              Post A Weather Update
            </div>
            
            <div
              onClick={()=>{setTabNumber(1);}} 
              className={`${tabNumber===1 ? 'border-b-4 border-b-green-400 text-black':''} text-slate-500 px-10 p-2 font-medium hover:cursor-pointer`}>
              Posted Updates
            </div>
          
          </div>

          {/** Container */}
          <div className='rounded mx-5 mt-3'>
            

            {/**Add Data */}
            {tabNumber===0 && (
              <div className=''>
                
                
                <label className="block mb-3">
                  <span className="text-gray-700 font-medium">Title</span>
                  <input
                    value={title}
                    onChange={handleTitleChange}
                    id="title"
                    type="text"
                    placeholder="Enter Title"
                    className="focus:outline-none w-full block mt-1 border border-gray-300 rounded-md p-2 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                  />
                </label>

                <div className="block mb-2">
                  <span className="text-gray-700 font-medium">Cover Image (Optional)</span>

                  <div className='flex items-center '>
                    <input
                      id="mainImageUrl"
                      name="mainImageUrl"
                      type="file"
                      placeholder="e.g Samsung, Dell, Apple ... "
                      className="bg-white col-span-3 focus:outline-none w-full block mt-1 border border-gray-300 rounded-md p-2 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      onChange={handleFileChange}
                      key={fileKey}
                    />
                    <div
                      onClick={()=>{resetFileInput();}}
                      className={`${mediaFile===null ? 'hidden':''} p-3 hover:cursor-pointer`}>
                      <CrossIcon className="h-5 h-6 text-red-500"/>
                    </div>
                  </div>

                </div>

                <span className="text-gray-700 font-medium">Content</span>
                <RichTextEditor 
                  placeholder='Type the Content Here'
                  value={value}
                  onChange={onChange}
                  className='min-h-[400px]' 
                  id="rte" 
                  controls={[
                    ['bold', 'italic', 'underline', 'link'],
                    ['unorderedList', 'h1', 'h2', 'h3'],
                    ['sup', 'sub'],
                    ['alignLeft', 'alignCenter', 'alignRight'],
                  ]}
                  />

                  {/* */}
                  <div className='mt-2 flex'>
                    
                    <div className='flex-1'>
                      {/*upload progress */}
                      {uploadProgress && mediaFile && (
                        <div className='flex'>
                          <span className=''>Upload ( </span>
                          <span className=''>{uploadProgress} )</span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={()=>{handlePostButtonClick()}} 
                      className='text-white bg-green-500 p-2 rounded hover:bg-green-700 hover:text-white'>
                      Post Update
                    </button>
                  </div>
              </div>
            )}


            {/**  View Data */}
            {tabNumber===1 && weatherUpdatesList.length>0 && (
              <div className=''>
                {/* Table Here */}
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Title
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Notification
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {weatherUpdatesList.map((item)=>{

                        return(
                        <tr key={item.id}className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {item.title}
                          </th>
                          <td className="px-6 py-4">
                            {getDayDateYearFromTimestamp(item.dateCreated)}
                          </td>

                          <td className="px-6 py-4">
                              {item.totalSentNotifications>0 && (
                                <div className='flex items-center space-x-3'>
                                  <div className='bg-green-50 p-1 rounded text-green-600 font-medium'>done</div>
                                  <div
                                    onClick={()=>{sendNotificationAgain(item);}} 
                                    className='text-blue-600 text-sm hover:cursor-pointer'>push again?</div>
                                </div>
                              )}

                              {item.totalSentNotifications===0 && (
                                <div className='flex items-center space-x-3'>
                                  <div className='bg-red-50 p-1 rounded text-red-600 font-medium'>not yet</div>
                                  <div
                                    onClick={()=>{sendNotificationAgain(item);}} 
                                    className='text-blue-600 text-sm hover:cursor-pointer'>send notification?</div>
                                </div>
                              )}
                          </td>

                          <td className="px-6 py-4">
                            <div className=''>
                              { /* Delete */ }
                              <div
                                onClick={()=>{handleOnDelete(item);}} 
                                className='hover:cursor-pointer'>
                                <TrashIcon className="h-5 w-5"/>
                              </div>
                              { /* Delete */ }

                              {/*send notification */}
                              <div></div>
                              {/*End of send notification */}
                            </div>
                          </td>
                        </tr>
                        );
                      })}
                    </tbody>

                  </table>
                  
                  {/* Pager */}
                  {/** End of Page */}

                </div>
                {/**End of Table */}
              </div>
            )}

            {/**  View Data */}
            {tabNumber===1 && weatherUpdatesList.length===0 && (
              <div className='h-[400px] flex items-center justify-center'>
                <div className='mt-10 flex flex-col items-center justify-center'>
                  <div className='font-medium'>
                    You haven't posted weather updates yet
                  </div>
                  <div>
                    <WomenDayIcon className="h-[200px] w-[300px]"/>
                  </div>
                </div>
              </div>
            )}


          </div>
          {/* End of Container */}

      </main>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
        {/* Same as */}
      <ToastContainer />

    </Layout>
  )
}


