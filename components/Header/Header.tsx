
import {
  SearchIcon,
  MoonIcon,
  SunIcon,
  BellIcon,
  MenuIcon,
  OutlinePersonIcon,
  OutlineCogIcon,
  OutlineLogoutIcon,
} from 'icons'
import Image from 'next/image'
import { useContext, useState } from 'react'
import { Avatar, Badge, Input, Dropdown, DropdownItem, WindmillContext } from  '@windmill/react-ui';
import Link from 'next/link';
import {useEffect} from 'react'; // don't forget
import SidebarContext, { SidebarProvider } from 'context/SidebarContext'
import { isDEVELOPMENT } from '@utils/constants/init_constants';

function Header() {

    const { mode, toggleMode } = useContext(WindmillContext)
    const { toggleSidebar } = useContext(SidebarContext);

    const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false)
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);
    const [showUserProfileDropdown, setShowUserProfileDropdown] = useState(false);

    function handleNotificationsClick() {
      setIsNotificationsMenuOpen(!isNotificationsMenuOpen)
      console.log("Notification clicked");
    }

    function handleProfileClick() {
      setIsProfileMenuOpen(!isProfileMenuOpen)
    }

    return(
        <header className="py-4 bg-white shadow-bottom dark:bg-gray-800">
            <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">

                {/* <!-- Mobile hamburger --> */}
                <button
                    onClick={toggleSidebar}
                    className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
                    aria-label="Menu">
                    <MenuIcon className="w-6 h-6" aria-hidden="true" />
                </button>

                {/*Search Input*/}
                <div className="flex justify-center flex-1 lg:mr-32">
                    <div className="relative max-w-xl w-full mr-6 focus-within:text-purple-500">
                        <div className="absolute inset-y-0 flex items-center pl-2">
                          <SearchIcon className="w-4 h-4 hover:cursor-pointer" aria-hidden="true" />
                        </div>
                        <input
                            className="focus:outline-none pl-8 text-gray-800 border border-slate-200 p-1 rounded-md w-full focus:border-purple-600 focus:ring focus:ring-purple-600 focus:ring-opacity-50"
                            placeholder="Search"
                            aria-label="Search"/>
                    </div>
                </div>
                {/*End of Search input*/}


                {/* Dev Mode or production */}
                {isDEVELOPMENT && (
                  <div className='mr-3 border-2 border-red-400 p-1'>
                    <span className=''>Dev Mode</span>
                  </div>
                )}
                
                <ul className="flex items-center flex-shrink-0 space-x-6">
                    {/* <!-- Theme toggler --> */}
                    <li className="flex">
                      <button
                        className="rounded-md focus:outline-none focus:shadow-outline-purple"
                        onClick={toggleMode}
                        aria-label="Toggle color mode"
                      >
                        {mode === 'dark' ? (
                          <SunIcon className="w-5 h-5" aria-hidden="true" />
                        ) : (
                          <MoonIcon className="w-5 h-5" aria-hidden="true" />
                        )}
                      </button>
                    </li>


                    {/* <!-- Notifications menu --> */}
                    <li className="">
                      <button
                        className="relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple"
                        onClick={()=>{handleNotificationsClick();setShowNotificationsDropdown(!showNotificationsDropdown)}}
                        aria-label="Notifications"
                        aria-haspopup="true"
                      >
                        <BellIcon className="w-5 h-5" aria-hidden="true" />
                        {/* <!-- Notification badge --> */}
                        <span
                          aria-hidden="true"
                          className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"
                        ></span>
                      </button>

                      <div className="relative">
                          <div  className={`${showNotificationsDropdown===null ? 'block':'hidden'} dark:bg-gray-800 dark:text-gray-400  top-0 absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white border border-gray-100 dark:border-gray-700 rounded-md shadow-lg`}>
                            <div className="p-2">
                                <div
                                    onClick={()=>{
                                        // close dropdown
                                        setShowNotificationsDropdown(!showNotificationsDropdown);
                                        // Go to settings
                                        //onUserDropDownItemClicked(USER_DROPDOWN_SETTINGS);
                                    }}
                                    className="flex space-x-2 items-center block px-4 py-2 text-sm text-gray-500 hover:text-white  hover:bg-gray-200 dark:hover:bg-gray-900 rounded-md"
                                >
                                    <div>
                                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <span>
                                        Settings
                                    </span>
                                </div>

                                <div
                                onClick={()=>{
                                    // close dropdown
                                    setShowNotificationsDropdown(!showNotificationsDropdown);
                                    // Sign out
                                    //onUserDropDownItemClicked(USER_DROPDOWN_SIGNOUT);
                                }}
                                    className="flex space-x-2 items-center block px-4 py-2 text-sm text-gray-500 hover:text-white hover:cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900 rounded-md"
                                >
                                    <div>
                                        <svg  className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" />
                                        </svg>
                                    </div>

                                    <span className="">
                                    Sign Out
                                    </span>
                                </div>

                            </div>
                          </div>
                      </div>
                    </li>
                    {/* <!-- End Notifications menu --> */}


                    {/* <!-- Profile menu --> */}
                    <li className="relative">
                      <div
                        onClick={()=>{setShowUserProfileDropdown(!showUserProfileDropdown);}}
                        className="hover:cursor-pointer border border-purple-500  dark:border-purple-300 rounded-full focus:shadow-outline-purple focus:outline-none">
                        <img
                          className="h-6 w-6 rounded-full"
                          src="/images/temp_profile.jpg"
                          alt=""
                          aria-hidden="true"
                        />
                      </div>

                      <div className="relative">
                          <div  className={`${showUserProfileDropdown===null ? 'block':'hidden'} dark:bg-gray-800 dark:text-gray-400  top-0 absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white border border-gray-100 dark:border-gray-700 rounded-md shadow-lg`}>
                            <div className="p-2">

                                <Link  href={'/'}>
                                    <div
                                        onClick={() => {setShowUserProfileDropdown(!showUserProfileDropdown);}}
                                        className="flex space-x-2 items-center block px-4 py-2 text-sm text-gray-500 hover:text-white  hover:bg-gray-200 dark:hover:bg-gray-900 rounded-md">
                                        <div>
                                            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <span>
                                            Settings
                                        </span>
                                    </div>
                                </Link>

                                <Link  href={'/'}>
                                </Link>
                                <div
                                    onClick={()=>{setShowUserProfileDropdown(!showUserProfileDropdown);}}
                                    className="flex space-x-2 items-center block px-4 py-2 text-sm text-gray-500 hover:text-white hover:cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900 rounded-md">
                                    <div>
                                        <svg  className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" />
                                        </svg>
                                    </div>

                                    <span className="">
                                    Sign Out
                                    </span>
                                </div>

                            </div>
                          </div>
                      </div>

                    </li>
                    {/* <!-- End of Profile menu --> */}


                </ul>

            </div>
        </header>
    );
}

export default Header;
