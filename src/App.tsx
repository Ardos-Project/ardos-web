import {Routes, Route} from "react-router-dom";
import {Toaster} from "react-hot-toast";

import useTheme from "@hooks/ThemeHook";
import useWs from "@hooks/WsHook";
import ThemeContext from "@context/ThemeContext";
import WsContext from "@context/WsContext";

import Login from "@routes/Login";
import Home from "@routes/Home";
import MessageDirector from "@routes/MessageDirector";
import ClientAgent from "@routes/ClientAgent";
import ViewClient from "@routes/ViewClient";
import StateServer from "@routes/StateServer";
import ViewDistObj from "@routes/ViewDistObj";
import Database from "@routes/Database";
import DatabaseStateServer from "@routes/DatabaseStateServer";
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
                    position="top-center"
                    reverseOrder={true}
                    toastOptions={theme === "dark" ? {} : {style: {background: "#333", color: "#fff"}}}
                />

                {authed ? (
                    <Routes>
                        <Route path={"/"} element={<Home />} />

                        <Route path={"/md"} element={<MessageDirector />} />

                        <Route path={"/ca"} element={<ClientAgent />} />
                        <Route path={"/ca/:channel"} element={<ViewClient />} />

                        <Route path={"/ss"} element={<StateServer />} />
                        <Route path={"/ss/:doId"} element={<ViewDistObj />} />

                        <Route path={"/db"} element={<Database />} />

                        <Route path={"/dbss"} element={<DatabaseStateServer />} />

                        <Route path={"/config"} element={<Config />} />
                    </Routes>
                ) : (
                    <Login />
                )}
            </WsContext.Provider>
        </ThemeContext.Provider>
    );
}
