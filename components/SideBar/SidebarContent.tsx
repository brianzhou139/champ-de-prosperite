
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import * as Icons from '@icons';
//import { IIcon } from 'icons'
import { IIcon } from '@icons';
import routes, { routeIsActive } from '@routes/sidebar'
import Link from 'next/link';
import { useRouter } from 'next/router';
import SidebarSubmenu  from '@components/SideBar/SidebarSubmenu';
//fb 
import { useAuth } from '@context/auth';
import { signOutUser } from '@lib/firebase_db/firebase_auth';


interface ISidebarContent{
  linkClicked: () => void
}

function DisplayIcon({icon, ...props}:IIcon){
    //let Icon = Icons[icon as unknown as keyof typeof Icons];
    let Icon = Icons[icon as unknown as keyof typeof Icons];
    return <Icon {...props}/>
}

function SidebarContent({ linkClicked }: ISidebarContent){

    const { pathname } = useRouter();
    const appName = process.env.NEXT_PUBLIC_APP_NAME;


    const Clicko=()=>{

    }

    const handleOnSignOutClick=()=>{
        signOutUser();
    }// end of handleOnSignOutClick

    return(
        <div className="text-gray-500 dark:text-gray-400">

            {/* AppName */}

            <Link href="/" passHref>
                <div className='ml-6 py-6 flex items-center'>
                    <div className=''>
                        <DisplayIcon
                            icon={'WLZLogoIcon'}
                            aria-hidden='true'
                            className='w-12 h-12' />
                    </div>
                    <div className="text-lg font-bold text-gray-800 dark:text-gray-200">
                        {appName}
                    </div>
                </div>
            </Link>

            {/* End of AppName */}

            <ul>
                {routes.map((route)=>{

                    if(route.routes){
                        return(
                            <SidebarSubmenu route={route} key={route.name} linkClicked={Clicko}/>
                        );
                    }else{
                        return(
                            <li key={route.name} className="relative px-6 py-3">
                                <Link href={route.path || '#'}>
                                    <div className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 ${routeIsActive(pathname, route) ? 'text-gray-900 dark:text-gray-100':'' }  `}>

                                        {routeIsActive(pathname,route) && (
                                            <span
                                                aria-hidden='true'
                                                className="absolute left-0 w-1 inset-y-0 bg-purple-600 rounded-tr-lg rounded-br-lg">
                                            </span>
                                        )}

                                        <DisplayIcon
                                            icon={route.icon || ''}
                                            aria-hidden='true'
                                            className='w-5 h-5' />

                                        <span className='ml-4'>{route.name}</span>

                                    </div>
                                </Link>
                            </li>
                        );
                    }
                })}
            </ul>

            {/* Button  */}
            <div className="px-6 my-6">
                <div
                    onClick={()=>{handleOnSignOutClick();}} 
                    className="hover:bg-purple-800 hover:cursor-pointer dark:bg-purple-800 flex inline-flex items-center space-x-1 bg-purple-600 text-slate-200 p-2 rounded-md">
                    <DisplayIcon
                        icon='LogOutIcon'
                        className="h-5 w-5"
                    />
                    <div onClick={()=>{handleOnSignOutClick();}}>Sign Out</div>
                </div>
            </div>
            {/*End of Button */}

        </div>
    );
}

export default SidebarContent;
