import {createContext} from "react";

export type WsContextType = {
    authed: boolean;
    name: string;
    connect?: Function;
    disconnect?: Function;
    subscribe?: Function;
    unsubscribe?: Function;
    send?: Function;
};

const WsContext = createContext<WsContextType>({authed: false, name: ""});

WsContext.displayName = "Websocket";

export default WsContext;
