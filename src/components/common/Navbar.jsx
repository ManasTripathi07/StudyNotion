import React, { useState,useEffect } from 'react'
import { Link,matchPath} from 'react-router-dom'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import {NavbarLinks} from "../../data/navbar-links"
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiOutlineMenu,AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { IoIosArrowDown } from "react-icons/io";
import { BsChevronDown } from "react-icons/bs"
import { ACCOUNT_TYPE } from "../../utils/constants"

const Navbar = () => {

    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const {totalItems} = useSelector((state) => state.cart);  
    
    
     const [loading, setLoading] = useState(false)
    const [subLinks,setSubLinks] =  useState([]);

    const fetchSublinks  = async() => {
            try{
                const result = await apiConnector("GET",categories.CATEGORIES_API);
                console.log("Printing Sublinks results: ",result);
                setSubLinks(result.data.data);
                console.log("Sublinks data is ->",subLinks);
            }
            catch(error){
                console.log("Could not fetch the Category List");
            }
        }

    useEffect( () => {
        fetchSublinks();
    },[]);

    const location = useLocation();
    const matchRoute = (route) => {
        return matchPath({path:route},location.pathname);
    }
  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
       <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
         
         {/* Logo-Image */}
         <Link to={"/"}>
            <img src = {logo} alt='logoImage' width={160} height={42} loading='lazy'/>
         </Link>

         {/* Nav-Links */}
         {/* <nav>
            <ul className='flex gap-x-6 text-richblack-25 '>
            {
                NavbarLinks.map((link,index) => (
                    <li key={index}>
                        {
                            link.title === "Catalog" ? 
                            (
                            <div className='relative flex items-center gap-2 group z-50 text-center '>
                                <p>{link.title}</p>
                                <IoIosArrowDown />

                                <div className='invisible absolute left-[50%]
                                    translate-x-[-50%] translate-y-[80%]
                                 
                                flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                                opacity-0 transition-all duration-200 group-hover:visible
                                group-hover:opacity-100 lg:w-[300px] shadow-[-2px_-1px_30px_4px] shadow-blue-200'>

                                <div className='absolute left-[50%] top-0
                                translate-x-[80%]
                                translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5'>
                                </div>

                                {
                                    subLinks.length ? (
                                            subLinks.map( (subLink, index) => (
                                                <Link to={`catalog/${subLink.name}`} key={index}>
                                                    <p className='text-black hover:text-blue-200 hover:scale-110 transition-all duration-200'>{subLink.name}</p>
                                                </Link>
                                            ) )
                                    ) : (<div></div>)
                                }

                                </div>


                            </div>
                            ) : (
                            <Link to={link?.path}>
                                <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>{link.title}</p>
                            </Link>)
                        }
                    </li>
                ))
            }
            </ul>
         </nav> */}

         <nav className="md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <>
                    <div
                      className={`group  relative flex cursor-pointer items-center  gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      <p>{link.title}</p>
                      <IoIosArrowDown />
                      <div className="invisible  absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px] shadow-[-2px_-1px_30px_4px] shadow-blue-200">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : subLinks.length ? (
                          <>
                            {subLinks
                              ?.filter(
                                (subLink) => subLink?.courses?.length > 0
                              )
                              ?.map((subLink, i) => (
                                <Link
                                  to={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50 text-center hover:text-blue-200 hover:scale-110 transition-all duration-200"
                                  key={i}
                                >
                                  <p >{subLink.name}</p>
                                </Link>
                              ))}
                          </>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
            
         {/* Login,SignUp,Dashboard */}
         
         <div className='flex gap-x-4 items-center'>
            {
                user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                  <Link to="/dashboard/cart" className="relative">
                    <AiOutlineShoppingCart className="text-2xl text-richblack-100 hover:text-yellow-25 transition-all duration-200" />
                    {totalItems > 0 && (
                      <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                        {totalItems}
                      </span>
                    )}
                  </Link>
                )
            }
            {
                token === null && (
                    <Link to="/login">
                        <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md hover:bg-richblack-600 hover:text-richblack-50 transition-all duration-200">
                            Log in 
                        </button>
                    </Link>
                )
            }
            {
                token === null && (
                    <Link to = "/signup">
                        <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md  hover:bg-richblack-600  hover:text-richblack-50 transition-all duration-200">
                            Sign Up
                        </button>
                    </Link>
                )
            }
            {
                
                token !== null && <ProfileDropDown/> 
            }
         </div>
       </div>
       
    </div>
  )
}

export default Navbar
