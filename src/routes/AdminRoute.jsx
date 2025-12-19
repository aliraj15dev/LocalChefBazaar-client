import Forbidden from '../components/Forbidden';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';

const AdminRoute = ({children}) => {
    const {loading} = useAuth()
    const {role, roleLoading} = useRole()

    if(loading || roleLoading){
        return <div className="text-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    }

    if(role !== 'Admin'){
        return <Forbidden/>
    }




    return children
};

export default AdminRoute;