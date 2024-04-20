import React, { useContext } from 'react';
import { UserContext } from '../AuthProvider/UserProvider';

const Profile = () => {

    const { user } = useContext(UserContext);
    console.log(user);
    return (
            <div className='bg-blue-950 w-4/12 mx-auto py-10 rounded-md text-white flex flex-col justify-center items-center gap-3'>
                {
                user.photoURL ? 
                <img className='w-20 rounded-full' src={user.photoURL} alt={user.displayName} />
                : ''
                }
                <h1 className='text-5xl font-semibold'>{user.displayName}</h1>
                <p>Email: {user.email}</p>
            </div>
    );
};

export default Profile;