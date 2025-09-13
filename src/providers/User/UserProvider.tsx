import React, { useState } from "react";
import { DocumentData } from "firebase/firestore";

interface IProps {
    children: React.ReactNode;
}

interface IState {
    setUser?: React.Dispatch<React.SetStateAction<DocumentData | null | undefined>>,
    user?: DocumentData | null | undefined;
}

export const UserContext: React.Context<IState> = React.createContext({});
// const UserProvider = (props: IProps) => {
//     const [user, setUser] = useState<DocumentData | null | undefined>();
//     React.useMemo(() => {
//         let u = sessionStorage.getItem('user');
//         if (u) {
//             setUser(JSON.parse(u));
//         }
//     }, []);
//     return (
//         <UserContext.Provider value={{ user: user, setUser: setUser }}>
//             {props.children}
//         </UserContext.Provider>
//     );

// };
const UserProvider = (props: IProps) => {
    const [user, setUser] = useState<DocumentData | null | undefined>();

    React.useEffect(() => {
        const u = sessionStorage.getItem('user');
        if (u) {
            setUser(JSON.parse(u));
        }
    }, []);

    React.useEffect(() => {
        if (user) {
            sessionStorage.setItem('user', JSON.stringify(user));
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserProvider;