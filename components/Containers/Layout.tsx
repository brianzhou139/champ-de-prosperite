import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode, use } from "react";
import Sidebar from '@components/SideBar';
import Main from '@components/Containers/Main';
import Header from '@components/Header/Header'
import SidebarContext, { SidebarProvider } from 'context/SidebarContext'
import { useContext } from 'react'
import { useState, CSSProperties } from "react";
import PuffLoader from "react-spinners/PuffLoader";


// fb 
import { useAuth } from '@context/auth';
import { signOutUser } from '@lib/firebase_db/firebase_auth';

const Layout=({ children}:{ children: ReactNode})=>{

    const router = useRouter();
    const {user,dbuser,userLoading} = useAuth();
    const { isSidebarOpen } = useContext(SidebarContext);

    // console.log("Hello Fb Testing Here ( user below ) ");
    // console.log(user);

    //console.log("db_user below");
    //console.log(dbuser);
    if (userLoading) {
        return (
            <div className='h-screen flex items-center justify-center'>
                <div className='flex flex-col items-center justify-center'>
                    <PuffLoader size={300} color="#16a34a" />
                    <span className='mt-3 '>WLZ Admin</span>
                </div>
            </div>
        );
    }

    if (user===null || user===undefined) {
        console.log("user ::: ");
        console.log(user);
        router.push('/auth/login');
        return null;
    }


    return(
        <SidebarProvider>
        <div className={`flex h-screen bg-gray-100 dark:bg-gray-900 ${isSidebarOpen && 'overflow-hidden'}`}>

            {/* Left SideBar */}
            <Sidebar/>

            {/* Right Nav and children */}
            <div className="flex flex-col flex-1 w-full">

                <Header/>

                <Main>
                    {children}
                </Main>
            </div>
            {/* end of nav and children*/}

        </div>
        </SidebarProvider>
    );
}


export default Layout;
