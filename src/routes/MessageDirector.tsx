import {useContext, useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import Dashboard from "@components/Dashboard";
import WsContext from "@context/WsContext";
import Loading from "@components/Loading";

export default function MessageDirector() {
    const {send, subscribe, unsubscribe} = useContext(WsContext);

    const [loading, setLoading] = useState(true);
    const [available, setAvailable] = useState(false);

    useEffect(() => {
        subscribe?.("md", (data: any) => {
            if (data["success"] === false) {
                setAvailable(false);
            }

            setLoading(false);
        });

        send?.("md", {});

        return () => unsubscribe?.("md");
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <Dashboard>
            <Helmet>
                <title>Message Director | Ardos</title>
            </Helmet>
            Home
        </Dashboard>
    );
}
