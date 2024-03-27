import {Routes, Route} from "react-router-dom";
import {Toaster} from "react-hot-toast";

import ThemeContext from "@context/ThemeContext";
import useTheme from "@hooks/ThemeHook";
import useAuth from "@hooks/AuthHook";
import AuthContext from "@context/AuthContext";
import Login from "./routes/Login";

export function App() {
    const {theme, setTheme} = useTheme();
    const {authed, url, setAuthed, setUrl} = useAuth();

    if (!authed) {
        return (
            <ThemeContext.Provider value={{theme, setTheme}}>
                <Login setAuthed={setAuthed} url={url} setUrl={setUrl} />;
            </ThemeContext.Provider>
        );
    }

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            <AuthContext.Provider value={{authed, url, setAuthed, setUrl}}>
                <Toaster position="top-right" reverseOrder={true} />

                <Routes></Routes>
            </AuthContext.Provider>
        </ThemeContext.Provider>
    );
}
