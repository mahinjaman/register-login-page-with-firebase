import React, { useContext } from 'react';
import { UserContext } from '../AuthProvider/UserProvider';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types'
const PrivateRoute = ({children}) => {
    const { user, loading } = useContext(UserContext);
    console.log(loading);
    if (loading){
        return <div className='flex items-center'>
            <span className="loading loading-ring loading-xs"></span>
            <span className="loading loading-ring loading-sm"></span>
            <span className="loading loading-ring loading-md"></span>
            <span className="loading loading-ring loading-lg"></span>
        </div>
    }
    if (user) {
        return children;
    }
    return (
        <Navigate to={'/login'}></Navigate>
    );
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PrivateRoute;