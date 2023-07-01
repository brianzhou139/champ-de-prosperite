// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import * as admin from "firebase-admin";


require('dotenv').config();

console.log("lennn uyo ::"+admin.apps.length);

if (admin.apps.length === 0) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
        }),
        databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
    });
}



type Data = {
  name: string
}


export default async function handler(req: NextApiRequest,res: NextApiResponse<any>) {
    let notificationTitle=req.body.notificationTitle;
    let notificationDescription=req.body.notificationDescription;
    let notificationTopic=req.body.notificationTopic;


    console.log("notify handle ");
    console.log(req.body);
    // Send notification using Firebase Cloud Messaging
    
    const message = {
        notification: {
            title: notificationTitle,
            body: notificationDescription,
        },
        topic: notificationTopic,
        "android": {
            "notification": {
                "sound": "default"
            }
        }
    };

    try {

        const response = await admin.messaging().send(message);
        console.log('Successfully sent message:', response);
        res.status(200).json({ status:200,name: 'John Doe' })

    } catch (error) {
        console.log('Error sending message:', error);
        res.status(400).json({ status:400,error: error })
    }
    
}