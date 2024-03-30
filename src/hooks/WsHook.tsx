import {useRef, useState} from "react";

export default function useWs() {
    const ws = useRef<WebSocket | null>(null);
    const messageCallbacks = useRef<{[message: string]: Function}>({});

    const [authed, setAuthed] = useState(false);
    const [name, setName] = useState("");

    const connect = (url: string, username: string, password: string) => {
        ws.current = new WebSocket(url);
        ws.current.onopen = () => {
            send("auth", {username, password});
        };
        ws.current.onclose = (event) => {
            setAuthed(false);
            console.error(`WS Closed: ${event.code}: ${event.reason}`);
        };
        ws.current.onmessage = (message: MessageEvent) => {
            const {type, ...data} = JSON.parse(message.data);
            if (messageCallbacks.current[type]) {
                messageCallbacks.current[type](data);
            } else {
                console.warn(`Received unhandled message ${type}: ${data}`);
            }
        };
    };

    const disconnect = () => {
        ws.current?.close();
    };

    const subscribe = (message: string, callback: Function) => {
        messageCallbacks.current[message] = callback;
    };

    const unsubscribe = (message: string) => {
        delete messageCallbacks.current[message];
    };

    const send = (message: string, data: any) => {
        ws.current?.send(JSON.stringify({type: message, ...data}));
    };

    return {
        authed,
        setAuthed,
        name,
        setName,
        connect,
        disconnect,
        subscribe,
        unsubscribe,
        send,
    };
}
