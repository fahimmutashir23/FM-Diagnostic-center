import PropTypes from 'prop-types';
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";
import Loading from '../Utils/Loading/Loading';
import Swal from 'sweetalert2';

const AdminRouts = ({children}) => {
    const [isAdmin, adminLoading] = useAdmin();
    const {user, loading} = useAuth();

    if(loading || adminLoading){
        return <Loading color="black" height="40" width="40" mt={6}></Loading>
    }
    if(user && isAdmin){
        return children
    }

    return Swal.fire({
        title: "You are not Admin",
        icon: "warning",
        confirmButtonText: "Cool",
      })
};

AdminRouts.propTypes = {
    children: PropTypes.node
};


export default AdminRouts;