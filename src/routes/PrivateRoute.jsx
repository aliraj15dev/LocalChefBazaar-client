import { use } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({children}) => {

    const {user, loading} = use(AuthContext)

    const location = useLocation()

    if(loading){
        return <span className="loading flex justify-center items-center loading-bars loading-xl"></span>
    }

    if(user){
        return children
    }
    return <Navigate state={location?.pathname} to='/login'/>
};

export default PrivateRoute;