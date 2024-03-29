import {Routes, Route} from "react-router-dom";
import {Toaster} from "react-hot-toast";

import useTheme from "@hooks/ThemeHook";
import useWs from "@hooks/WsHook";
import ThemeContext from "@context/ThemeContext";
import WsContext from "@context/WsContext";

import Login from "@routes/Login";
import Home from "@routes/Home";

export function App() {
    const {theme, setTheme} = useTheme();
    const {authed, name, connect, disconnect, subscribe, unsubscribe, send} = useWs();

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            <WsContext.Provider value={{authed, name, connect, disconnect, subscribe, unsubscribe, send}}>
                <Toaster
                    position="top-right"
                    reverseOrder={true}
                    toastOptions={theme === "dark" ? {style: {background: "#333", color: "#fff"}} : {}}
                />

                {authed ? (
                    <Routes>
                        <Route path={"/"} element={<Home />} />
                    </Routes>
                ) : (
                    <Login connect={connect} />
                )}
            </WsContext.Provider>
        </ThemeContext.Provider>
    );
}
