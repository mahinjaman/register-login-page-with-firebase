import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../AuthProvider/UserProvider';

import { IoIosLogOut } from "react-icons/io";

const Navbar = () => {

    const { user, handleSignOut } = useContext(UserContext);
    const menu = <>
        <li><NavLink to={'/'}>Home</NavLink></li>
        <li><NavLink to={'/login'}>Login</NavLink></li>
        <li><NavLink to={'/register'}>Register</NavLink></li>
        {
            user && <>
                <li><NavLink to={'/order'}>Order</NavLink></li>
                <li><NavLink to={'/profile'}>Profile</NavLink></li>
            </>
        }
    </>

    const handleLogOut = ()=>{
        handleSignOut()
        .then(()=>{
            alert('Make sure you have Sign-Out')
        })
        .catch(err=>{
            console.log(err.message);
        })
    }

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {
                            menu
                        }
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">Auth Practice</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {
                        menu
                    }
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ?
                        <div className="navbar-item flex justify-center items-center">
                            <a className="btn btn-ghost">Hello, {user.displayName}</a>
                            <button onClick={handleLogOut} className=''><IoIosLogOut /></button>
                        </div>
                        :
                        <div className="navbar-item">
                            <a className="btn btn-ghost" href="/login">Login</a>
                        </div>
                }
            </div>
        </div>
    );
};

export default Navbar;