import {createContext} from "react";

export type WsContextType = {
    authed: boolean;
    connect?: Function;
    disconnect?: Function;
    subscribe?: Function;
    unsubscribe?: Function;
    send?: Function;
};

const WsContext = createContext<WsContextType>({authed: false});

WsContext.displayName = "Websocket";

export default WsContext;
