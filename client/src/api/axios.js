import axios from 'axios'

const BASE_URL = (process.env.NODE_ENV === 'production') ? 
                    'https://maramitas.site/' :
                    'http://localhost:8000/';

//default private axios instance
const axiosPrivate = axios.create({
    baseURL: BASE_URL
});

const axiosPublic = axios.create({
    baseURL: BASE_URL
});

export { axiosPublic, axiosPrivate };