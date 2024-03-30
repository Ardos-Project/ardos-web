import {Routes, Route} from "react-router-dom";
import {Toaster} from "react-hot-toast";

import useTheme from "@hooks/ThemeHook";
import useWs from "@hooks/WsHook";
import ThemeContext from "@context/ThemeContext";
import WsContext from "@context/WsContext";

import Login from "@routes/Login";
import Home from "@routes/Home";
import Config from "@routes/Config";

export function App() {
    const {theme, setTheme} = useTheme();
    const {authed, setAuthed, name, setName, connect, disconnect, subscribe, unsubscribe, send} = useWs();

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            <WsContext.Provider
                value={{authed, setAuthed, name, setName, connect, disconnect, subscribe, unsubscribe, send}}
            >
                <Toaster
                    position="top-right"
                    reverseOrder={true}
                    toastOptions={theme === "dark" ? {} : {style: {background: "#333", color: "#fff"}}}
                />

                {authed ? (
                    <Routes>
                        <Route path={"/"} element={<Home />} />
                        <Route path={"/md"} element={<Home />} />
                        <Route path={"/ca"} element={<Home />} />
                        <Route path={"/ss"} element={<Home />} />
                        <Route path={"/db"} element={<Home />} />
                        <Route path={"/dbss"} element={<Home />} />
                        <Route path={"/config"} element={<Config />} />
                    </Routes>
                ) : (
                    <Login />
                )}
            </WsContext.Provider>
        </ThemeContext.Provider>
    );
}
