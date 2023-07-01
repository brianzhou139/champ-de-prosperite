
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { USERMODEL } from '@models/db_model';
import { UserCircleIcon } from '@icons';
import { userOnlyHasReadRights,isThisMe,userHasWriteAccess,userIsRootUser } from '@utils/functions/utils_functions';
import { UNAUTHORISED_WRITE_ACCESS_MESSAGE } from '@utils/constants/warning_constants';
import {AdminSettingIcon} from '@icons';
import { updateDBNode } from '@lib/firebase_db/firebase_writes';
import { REALTIME_DATABASE_DB_USERS_PATH } from '@utils/constants/db_constants';
import { CrossIcon, TrashIcon } from '@icons'
import { deletePathFromFbDb } from '@lib/firebase_db/firebase_writes';

function AdminDisplayer({ adminsList,dbuser }:{adminsList:USERMODEL[],dbuser:any}){

  const handleGrantAdminRights=(admin:USERMODEL)=>{
    if(dbuser===null){
      return;
    }

    if(!userHasWriteAccess(dbuser)){
      alert(UNAUTHORISED_WRITE_ACCESS_MESSAGE);
      return;
    }

    let pathToCurrentAdmin=REALTIME_DATABASE_DB_USERS_PATH+admin.uid;
    let changesData={
      adminLevel:3,
    };
    updateDBNode(pathToCurrentAdmin,changesData);
  }//end of handleGrantAdminRights 

  const handleOnDeleteAdmin=(admin:USERMODEL)=>{
    if(dbuser==null){
      return;
    }

    if(!userHasWriteAccess(dbuser)){
      alert(UNAUTHORISED_WRITE_ACCESS_MESSAGE);
      return;
    }

    const removeUser = confirm(
      'Are you sure you want to delete this User?, this operation is irreversible',
    );
    if (removeUser) {
      let path:string = REALTIME_DATABASE_DB_USERS_PATH+admin.uid;
      deletePathFromFbDb(path);
    }
  }

  return(
    <div className=''>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {/* Table Shown Here */}
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Privileges
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                </tr>
            </thead>
            {/** List of Admins */}
            {adminsList.map((admin)=>{

              return(
                <tbody key={admin.uid} className=''>
                  <tr className={` ${isThisMe(admin.uid,dbuser) ? 'bg-cyan-100 dark:bg-cyan-400 hover:bg-cyan-200 dark:hover:bg-cyan-500':'bg-white hover:bg-gray-50 dark:hover:bg-gray-600'} border-b dark:bg-gray-800 dark:border-gray-700 `}>
                      <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                          <UserCircleIcon className="w-10 h-10 rounded-full"/>
                          <div className="pl-3">
                              <div className="text-base font-semibold">{admin.fullName}</div>
                              <div className="font-normal text-gray-500">{admin.email}</div>
                          </div>  
                      </th>

                      {/** Rights/Priviledges */}
                      <td className="px-6 py-4">
                        {userOnlyHasReadRights(admin) && (
                          <div className="inline-flex bg-red-50 p-1 rounded">
                            <span>Read Only Access</span>
                          </div>
                        )}

                        {userHasWriteAccess(admin) && !userIsRootUser(admin) && (
                          <div className="inline-flex bg-yellow-100 p-1 rounded">
                            <span>Write Access</span>
                          </div>
                        )}

                        {userIsRootUser(admin) && (
                          <div className="inline-flex bg-green-200 p-1 rounded">
                            <span>All Permissions</span>
                          </div>
                        )}
                      </td>

                      <td className="px-6 py-4">
                          <div className='flex space-x-3 items-center'>

                            {!isThisMe(admin.uid,dbuser) && !userHasWriteAccess(admin) && userHasWriteAccess(dbuser) && (
                              <div className='flex'>
                              {/*Grant Write Permission */}
                              <div 
                                onClick={()=>{handleGrantAdminRights(admin)}}
                                className='flex items-center space-x-2 bg-blue-200 p-2 rounded-md hover:cursor-pointer'>
                                <AdminSettingIcon className="h-5 w-5"/>
                                <span>Grant Write Permission</span>
                              </div>

                              {/* */}
                              <div></div>
                            </div>
                            )}

                            { /* Delete */ }
                              {!isThisMe(admin.uid,dbuser) && !userIsRootUser(admin) && userIsRootUser(dbuser) && (
                                <div
                                  onClick={()=>{handleOnDeleteAdmin(admin);}} 
                                  className='hover:cursor-pointer'>
                                  <TrashIcon className="h-5 w-5"/>
                                </div>
                              )}
                            { /* Delete */ }
                          </div>
                          {/*<!-- Modal toggle --> */}

                      </td>

                  </tr>
                </tbody>
              );
            })}
        </table>
      </div>
    </div>
  );
}

export default AdminDisplayer;