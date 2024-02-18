import { createContext, useState } from 'react';

const AppAuthContext = createContext([]);

export const AppAuthProvider = ({ children }) => {

    const [appAuth, setAppAuth] = useState({});

    return (
        <AppAuthContext.Provider value={[appAuth, setAppAuth]}>
            {children}
        </AppAuthContext.Provider>
    );
}

export default AppAuthContext;
