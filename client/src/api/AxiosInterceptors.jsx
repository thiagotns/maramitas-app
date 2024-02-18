import { useEffect } from 'react';
import { axiosPrivate, axiosPublic } from './axios.js';
import useAppAuth from '../hooks/useAppAuth.js';

function AxiosInterceptors({children}) {

    const [ appAuth, setAppAuth ] = useAppAuth();

    useEffect(() => {

        const requestInterceptor = axiosPrivate.interceptors.request.use(
            (config) => {

                console.log("AxiosInterceptors [request] config");

                if (appAuth && appAuth.token) {
                    console.log("AxiosInterceptors [request] appAuth.token", appAuth.token);
                    config.headers.Authorization = `Bearer ${appAuth.token}`;
                }

                return config;
            },
            (error) => {
                console.log("AxiosInterceptors [request] error");
                return Promise.reject(error);
            }
        );

        const responseInterceptor = axiosPrivate.interceptors.response.use(
            (response) => response,
            (error) => {
                console.log("AxiosInterceptors [response] error");
                
                const prevRequest = error.config;
                if (error.response && error.response.status === 401 && !prevRequest._retry) {
                    prevRequest._retry = true;
                    console.log("AxiosInterceptors [response] 401 error");
                    // Refresh token
                    
                    axiosPublic.post('/api/token/refresh/', {
                        refreshToken: appAuth.refreshToken
                    }).then((response) => {
                        console.log("AxiosInterceptors [response] 401 error - refresh token success");
                        setAppAuth(...appAuth, response.data.token);
                        return axiosPrivate(prevRequest);
                    }).catch((error) => {
                        console.log("AxiosInterceptors [response] 401 error - refresh token error");
                        console.log(error);
                        //setAppAuth(null);
                    });
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestInterceptor);
            axiosPrivate.interceptors.response.eject(responseInterceptor);
        };

    }, [appAuth, setAppAuth]);
    
    return children;
}

export default AxiosInterceptors;