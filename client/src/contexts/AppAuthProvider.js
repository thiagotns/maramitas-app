import { createContext, useState } from 'react';

const AppAuthContext = createContext([]);

export const AppAuthProvider = ({ children }) => {

    const [appAuth, setAppAuth_] = useState(JSON.parse(localStorage.getItem('appAuth')) || {});

    const setAppAuth = (appAuth) => {
        localStorage.setItem('appAuth', JSON.stringify(appAuth));
        setAppAuth_(appAuth);
    }

    return (
        <AppAuthContext.Provider value={[appAuth, setAppAuth]}>
            {children}
        </AppAuthContext.Provider>
    );
}

export default AppAuthContext;
