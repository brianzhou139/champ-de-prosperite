import { getChildValue } from "@lib/firebase_db/firebase_reads";
import { updateDBNode } from "@lib/firebase_db/firebase_writes";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 *
 * @param path | e.g market_guide/
 * @param uid
 * @param title
 * @param description
 * @param topic
 */
export const sendNotificationToBackend=async(path:string,uid:string,title:string,description:string,topic:string)=>{
    try {
        const res = await fetch('/api/notify',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                    notificationTitle:title,
                    notificationDescription:description,
                    notificationTopic:topic
                }),
            }
        );
        const data = await res.json();

        if(data.status===200){
            // success
            console.log("sendNotificationToBackend Results done");
            console.log(data);

            showToast("📱Push Notification sent to users");

            // updating the notifications count
            let pathToValue=path+uid+"/totalSentNotifications";
            let currentCount:number= await getChildValue(pathToValue);
            let newChanges={
                totalSentNotifications:currentCount+1,
            };

            let pathToNode=path+uid;
            updateDBNode(pathToNode,newChanges);
        }else{
            console.log("sendNotificationToBackend Error");
            console.log(data);
        }
    } catch (err) {
        console.log("sendNotificationToBackend Error");
        console.log(err);
    }
}// end of sendNotificationToBackend


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
