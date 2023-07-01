import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import Layout from '@components/Containers/Layout';
import { Button } from '@windmill/react-ui'
import { useState,useEffect,useRef } from 'react';
import { useRouter } from 'next/router';
import { CrossIcon, TrashIcon,FarmerIcon,WomenDayIcon } from '@icons'
import { REALTIME_DB_MARKET_GUIDE,REALTIME_DB_WEATHER_NEWS } from '@utils/constants/db_constants';
import { postObjectData } from '@lib/firebase_db/firebase_writes';
import { JOBSTATUSMODEL } from '@models/db_model';
import { sendNotificationToBackend } from '@lib/firebase_fcm/notifications';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '@context/auth';
import { userOnlyHasReadRights } from '@utils/functions/utils_functions';
import { UNAUTHORISED_WRITE_ACCESS_MESSAGE } from '@utils/constants/warning_constants';


const inter = Inter({ subsets: ['latin'] })

const optionTopicsObject={
  0:'market_guide',
  1:'weather_update',
};

const optionDBPATHObject={
  0:REALTIME_DB_MARKET_GUIDE,
  1:REALTIME_DB_WEATHER_NEWS,
};

export default function Farmers() {
  const router = useRouter();
  const {user,dbuser,userLoading} = useAuth();
 
  const [ websiteUrl, setWebsiteUrl ]=useState('');
  const [ urlTypeOption, setUrlTypeOption] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [webContent,setWebContent]=useState(null);

  // all data values
  const [values,setValues]=useState({
    title:'',
    imageUrl:'',
    description:'',
    content:'',
  });
  
  const handleTitleChange = (e:any) => {
    const id = e.target.id;
    const newValue = e.target.value;
    setWebsiteUrl(newValue);
  };

  const handleImportDataFromUrl=()=>{
    if(dbuser==null){
      return;
    }

    if(userOnlyHasReadRights(dbuser)){
      alert(UNAUTHORISED_WRITE_ACCESS_MESSAGE);
      return;
    }
    
    retrieveUrlDataFromBackend();
  }

  const handleOptionChange = (index:number) => {
    console.log(">>>> huyoooooo : "+index);
    setUrlTypeOption(index);
  }// end of handleOptionChange

  const retrieveUrlDataFromBackend=async()=>{
    try {
        const res = await fetch('/api/parser',
            {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body:JSON.stringify({websiteUrl:websiteUrl}),
            }
        );
        const data = await res.json();

        let title=data.title??'';
        let content=data.content??'';
        let description=data.description??'';
        let imgUrl=data.image??'';
        setValues({
          title:title,
          imageUrl:imgUrl,
          description:description,
          content:content,
        });
        setWebContent(content);
    } catch (err) {
        console.log("sendNotificationToBackend Error");
        console.log(err);
        setWebsiteUrl('');
    }
}// end of sendNotificationToBackend


  const handleOnPostImportedData=()=>{
    console.log("handleOnPostImportedData..");
    let typeNum:number=0;

    if(values.title.trim().length<5 || values.description.trim().length<5){
      alert("The imported data is too small");
      return;
    }

    if(values.imageUrl.trim().length>2){
      typeNum=1;
    }

    let dataObject={
      id:'',
      type:typeNum,
      title:values.title,
      htmlContent:values.content,
      textShortContent:values.description,
      coverImageUrl:values.imageUrl,
      dateCreated:'',
      postedById:'',
      totalSentNotifications:0,
    };

    let path=optionDBPATHObject[urlTypeOption as keyof typeof optionDBPATHObject];

    postObjectData(path,dataObject,receiverRealTimeDbResults);

  };
  // receiver results RealTime database SaveData
  const receiverRealTimeDbResults=(jobStatus:JOBSTATUSMODEL,dataObject:any)=>{
    setIsLoading(false);
    console.log(jobStatus);
    // check if job was done properly
    if(jobStatus.finished){
      console.log("data saved successfully oops *** ici Zoust");
      let topic=optionTopicsObject[urlTypeOption as keyof typeof optionTopicsObject];
      let path=optionDBPATHObject[urlTypeOption as keyof typeof optionDBPATHObject];
      const wordsList = dataObject.textShortContent.split(' ');
      const firstTwentyWords = wordsList.slice(0,20).join(' ');
      sendNotificationToBackend(path,dataObject.id,dataObject.title,firstTwentyWords,topic);
    }else if(jobStatus.error){
      // handle error
    }
    setWebsiteUrl('');
    setWebContent(null);
    setValues({
      title:'',
      imageUrl:'',
      description:'',
      content:'',
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

    {/* Container */}
    <main className="mx-5 mt-3">
      <div>

      {/* radio buttons */}
      <div>
        <span className="text-gray-700 font-medium">Select the type of content in the article</span>
        <ul className="mt-2 items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <li onClick={()=>{handleOptionChange(0);}} className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center pl-3">
                    <input defaultChecked id="horizontal-list-radio-license" type="radio" value="" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                    <label htmlFor="horizontal-list-radio-license" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Market Guide </label>
                </div>
            </li>
            <li onClick={()=>{handleOptionChange(1);}} className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center pl-3">
                    <input id="horizontal-list-radio-id" type="radio" value="" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                    <label htmlFor="horizontal-list-radio-id" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Weather News/Update</label>
                </div>
            </li>
        </ul>
      </div>

      {/*End of Radio Button*/}
        {/* Url Form */}
        <div className="mt-2">
          <span className="text-gray-700 font-medium">Article Website Link</span>
          
          <div className='flex items-center space-x-3'>
            <input
              value={websiteUrl}
              onChange={handleTitleChange}
              id="websiteUrl"
              type="text"
              placeholder="Paste the link to the article here"
              className="flex-1 focus:outline-none mt-1 border border-gray-300 rounded-md p-2 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
            <button
              onClick={()=>{handleImportDataFromUrl()}} 
              className='text-white bg-slate-500  p-2 rounded hover:bg-green-700 hover:text-white'>
              Import Data from Url
            </button>

          </div>
        </div>
        {/**End of Url Form */}

        {/* Post Imported Data*/}
        <div className='mt-3'>
          {webContent && (
            <button
            onClick={()=>{handleOnPostImportedData()}} 
            className='text-white bg-green-500  p-2 rounded hover:bg-green-700 hover:text-white'>
            Post Imported Data
          </button>
          )}
        </div>
        {/* End of Post Button */}


        {/* iframe Data  */}
        <div className='mt-5 mb-[200px]'>
          {webContent && (
            <iframe className='h-screen w-full overflow-y-hidden' src={"data:text/html;charset=utf-8," + webContent} key={webContent}></iframe>
          )}
        </div>
        {/* End of Iframe*/}


      </div>
    </main>
     {/* End Container */}
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
