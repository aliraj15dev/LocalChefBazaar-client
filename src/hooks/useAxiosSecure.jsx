import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/"
    // baseURL: 'https://assignment11-server-gamma.vercel.app/'
})

const useAxiosSecure = () => {
    return axiosInstance
};

export default useAxiosSecure;