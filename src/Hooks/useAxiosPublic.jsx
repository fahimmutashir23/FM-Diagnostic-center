import axios from "axios";


const axiosPublic = axios.create({
    baseURL: "https://fm-diagnostic-server.vercel.app"
    // baseURL: "http://localhost:5000"
})

const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;