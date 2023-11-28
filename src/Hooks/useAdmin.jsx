import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useAdmin = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const token = localStorage.getItem('access')

    const {data : isAdmin = [], isPending: adminLoading} = useQuery({
        queryKey: [user?.email, "admin"],
        enabled: !!user?.email && !!token,
        queryFn: async() => {
            const res = await axiosSecure.post(`/users/admin/${user?.email}`)
            return res.data.admin
        }
    })
    return [isAdmin, adminLoading]
};

export default useAdmin;