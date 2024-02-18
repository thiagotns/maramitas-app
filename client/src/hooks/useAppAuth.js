import {useContext} from 'react';
import AppAuthContext from '../contexts/AppAuthProvider';

const useAppAuth = () => {
    return useContext(AppAuthContext);
}

export default useAppAuth;
