import {Routes, Route} from "react-router-dom";
import {Toaster} from "react-hot-toast";

import useTheme from "@hooks/ThemeHook";
import useWs from "@hooks/WsHook";
import ThemeContext from "@context/ThemeContext";
import WsContext from "@context/WsContext";

import Login from "./routes/Login";

export function App() {
    const {theme, setTheme} = useTheme();
    const {authed, connect, disconnect, subscribe, unsubscribe, send} = useWs();

    if (!authed) {
        return (
            <ThemeContext.Provider value={{theme, setTheme}}>
                <Toaster position="top-right" reverseOrder={true} />
                <Login connect={connect} />;
            </ThemeContext.Provider>
        );
    }

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            <WsContext.Provider value={{authed, connect, disconnect, subscribe, unsubscribe, send}}>
                <Toaster position="top-right" reverseOrder={true} />

                <Routes></Routes>
            </WsContext.Provider>
        </ThemeContext.Provider>
    );
}
