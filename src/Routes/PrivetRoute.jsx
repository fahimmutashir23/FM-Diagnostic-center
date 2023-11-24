
import PropTypes from 'prop-types';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../Utils/Loading/Loading';
import Swal from 'sweetalert2';

const PrivetRoute = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation();

    if(loading){
        return <Loading color="black" height="40" width="40"></Loading>
    } else if(user){
        return children
    }
    return Swal.fire({
        title: "You are not Logged in",
        text: "Please Login first to use this service",
        icon: "warning",
        confirmButtonText: "Cool",
      }) && <Navigate state={location.pathname} to="/login"></Navigate>
};

PrivetRoute.propTypes = {
    children: PropTypes.node
};

export default PrivetRoute;