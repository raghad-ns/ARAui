import React, { useState } from "react";
import { User } from "firebase/auth";

interface IProps {
    children: React.ReactNode;
}

interface IState {
    setUser?: React.Dispatch<React.SetStateAction<User | undefined>>,
    user?: User;
}

export const UserContext: React.Context<IState> = React.createContext({});
const UserProvider = (props: IProps) => {
    const [user, setUser] = useState<User>();
    React.useMemo(() => {
        let u = sessionStorage.getItem('user');
        if (u) {
            setUser(JSON.parse(u));
        }
    }, []);
    return (
        <UserContext.Provider value={{ user: user, setUser: setUser }}>
            {props.children}
        </UserContext.Provider>
    );

};
export default UserProvider;