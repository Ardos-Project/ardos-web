import {useContext, useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import Dashboard from "@components/Dashboard";
import WsContext from "@context/WsContext";

export default function Database() {
    const {send, subscribe, unsubscribe} = useContext(WsContext);

    const [loading, setLoading] = useState(false);
    const [available, setAvailable] = useState(false);

    useEffect(() => {}, []);

    return (
        <Dashboard>
            <Helmet>
                <title>Database | Ardos</title>
            </Helmet>
            Home
        </Dashboard>
    );
}
