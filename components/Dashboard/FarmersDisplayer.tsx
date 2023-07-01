
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FARMERMODEL } from '@models/db_model';
import { UserCircleIcon,FarmerUserIcon } from '@icons';
import { UNAUTHORISED_WRITE_ACCESS_MESSAGE } from '@utils/constants/warning_constants';
import { userOnlyHasReadRights,isThisMe,userHasWriteAccess } from '@utils/functions/utils_functions';
import { deletePathFromFbDb } from '@lib/firebase_db/firebase_writes';
import { REALTIME_DB_FARMERS } from '@utils/constants/db_constants';
import { CrossIcon, TrashIcon } from '@icons'

function FarmersDisplayer({ farmersList,dbuser }:{farmersList:FARMERMODEL[],dbuser:any}){

  const handleOnDeleteFarmer=(farmer:FARMERMODEL)=>{
    if(dbuser==null){
      return;
    }
    if(!userHasWriteAccess(dbuser)){
      alert(UNAUTHORISED_WRITE_ACCESS_MESSAGE);
      return;
    }
    const removeUser = confirm(
      'Are you sure you want to delete this Farmer?, this operation is irreversible',
    );
    if (removeUser) {
      let path:string = REALTIME_DB_FARMERS+farmer.farmerId;
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
                      Gender
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Village
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Ward
                    </th>
                    <th scope="col" className="px-6 py-3">
                      District
                    </th>

                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                </tr>
            </thead>
            {/** List of Admins */}
            {farmersList.map((farmer)=>{

              return(
                <tbody key={farmer.farmerId}>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                          <FarmerUserIcon className="w-10 h-10 rounded-full text-green-200 bg-green-200 dark:bg-green-400 "/>
                          <div className="pl-3">
                              <div className="text-base font-semibold">{farmer.firstNameAndSurname}</div>
                              <div className="font-normal text-gray-500">{farmer.phoneNumber}</div>
                          </div>  
                      </th>
                      {/** Gender */}
                      <td className="px-6 py-4">
                        <div className="inline-flex">
                          <span>{farmer.gender}</span>
                        </div>
                      </td>
                      
                      {/** Village*/}
                      <td className="px-6 py-4">
                        <div className="inline-flex">
                          <span>{farmer.village}</span>
                        </div>
                      </td>

                      {/** Ward */}
                      <td className="px-6 py-4">
                        <div className="inline-flex">
                          <span>{farmer.ward}</span>
                        </div>
                      </td>
                      
                      {/** District */}
                      <td className="px-6 py-4">
                        <div className="inline-flex">
                          <span>{farmer.district}</span>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4">
                        { /* Delete */ }
                          {userHasWriteAccess(dbuser) && (
                            <div
                              onClick={()=>{handleOnDeleteFarmer(farmer);}} 
                              className='hover:cursor-pointer'>
                              <TrashIcon className="h-5 w-5"/>
                            </div>
                          )}
                          { /* Delete */ }
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

export default FarmersDisplayer;