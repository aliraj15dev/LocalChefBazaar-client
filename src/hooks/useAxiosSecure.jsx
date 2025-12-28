import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://assignment11-server-gamma.vercel.app/'
})

const useAxiosSecure = () => {
    return axiosInstance
};

export default useAxiosSecure;