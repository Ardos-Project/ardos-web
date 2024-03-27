import {createContext} from "react";

export type AuthContextType = {
    authed: boolean;
    url: string;
    setAuthed?: Function;
    setUrl?: Function;
};

const AuthContext = createContext<AuthContextType>({authed: false, url: ""});

AuthContext.displayName = "Auth";

export default AuthContext;
