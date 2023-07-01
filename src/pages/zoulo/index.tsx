
import dynamic from 'next/dynamic';
import React, { useEffect,useState } from "react";

function Zoulo(){

    const [formValues, setFormValues] = useState({  
        noticationTitle:'',
        notificationDescription:'',
        notificationTopic:'weather_update',
      });

    const handleChange = (e:any) => {
        const id = e.target.id;
        const newValue = e.target.value;
        setFormValues({ ...formValues, [id]: newValue });
    };

    const handleSubmit = async(e:any) => {
        e.preventDefault();

        // setting the Topic 
        //setFormValues((prevState:any)=>({ ...prevState, notificationTopic:"market_guide"}));

        console.log("submit button Clicked");
        console.log(formValues);
        sendNotificationToBackend();
    } // end of handleSubmit 

    const sendNotificationToBackend=async()=>{
        try {
            const res = await fetch('/api/notify',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body:JSON.stringify(formValues),
                }
            );
            const data = await res.json();
            console.log("sendNotificationToBackend Results done");
            console.log(data);
            emptyFormValues();
        } catch (err) {
            console.log("sendNotificationToBackend Error");
            console.log(err);
            emptyFormValues();
        }
    }// end of sendNotificationToBackend

    const emptyFormValues=()=>{
        setFormValues({
            noticationTitle:'',
            notificationDescription:'',
            notificationTopic:'weather_update',
        });
    }

    return(
        <div className='p-10'>
            <form onSubmit={handleSubmit}>
                 <div>
                    <label className='mt-2 block' htmlFor="noticationTitle">Notification Title</label>
                    <input
                        className='border border-slate-200'
                        id="noticationTitle"
                        type="text"
                        value={formValues.noticationTitle}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label className='mt-2 block'  htmlFor="notificationDescription">Notification Description</label>
                    <input
                        className='border border-slate-200'
                        id="notificationDescription"
                        type="text"
                        value={formValues.notificationDescription}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button className='mt-2 block bg-cyan-500 p-2 rounded'  type="submit">Create Account</button>

            </form>
        </div>
    );
}

export default Zoulo;