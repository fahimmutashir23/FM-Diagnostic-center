import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";


const axiosSecure = axios.create({
    baseURL: `https://fm-diagnostic-server.vercel.app`
    // baseURL: "http://localhost:5000"
})

const useAxiosSecure = () => {
    const {logOutUser} = useAuth()
    const navigate = useNavigate()

    axiosSecure.interceptors.request.use((config)=> {
        const token = localStorage.getItem('access')
        config.headers.authorization = `${token}`
        return config
    }, error => {
        return Promise.reject(error)
    })

    axiosSecure.interceptors.response.use(response => {
        return response
    }, async error => {
        const status = error.response.status;
        if(status === 401 || status === 403){
            await logOutUser()
            navigate('/login')
        }
        return Promise.reject(error)
    })
    return axiosSecure
};

export default useAxiosSecure;