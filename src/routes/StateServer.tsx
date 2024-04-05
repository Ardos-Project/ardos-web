import {useContext, useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import Dashboard from "@components/Dashboard";
import WsContext from "@context/WsContext";
import Loading from "@components/Loading";
import NotAvailable from "@components/NotAvailable";
import DistributedObjectList from "@components/DistributedObjectList";

type DistributedObject = {
    doId: number;
    clsName: string;
    parentId: number;
    zoneId: number;
};

export default function StateServer() {
    const {send, subscribe, unsubscribe} = useContext(WsContext);

    const [loading, setLoading] = useState(true);
    const [available, setAvailable] = useState(false);
    const [channel, setChannel] = useState(0);
    const [distObjs, setDistObjs] = useState<DistributedObject[]>([]);

    useEffect(() => {
        subscribe?.("ss:init", (data: any) => {
            if (data["success"] === false) {
                setAvailable(false);
                setLoading(false);
                return;
            }

            setAvailable(true);
            setChannel(data["channel"]);
            setDistObjs(data["distObjs"]);

            setLoading(false);
        });

        send?.("ss", {msg: "init"});

        return () => unsubscribe?.("ss:init");
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (!available) {
        return <NotAvailable name={"State Server"} />;
    }

    return (
        <Dashboard>
            <Helmet>
                <title>State Server | Ardos</title>
            </Helmet>

            <div className={"pb-8"}>
                <h1 className={"text-4xl font-bold text-gray-700 dark:text-white"}>Configuration</h1>
                <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                    <div className="pt-6 sm:flex">
                        <dt className="text-2xl font-medium text-gray-700 dark:text-white sm:w-64 sm:flex-none sm:pr-6">
                            Channel
                        </dt>
                        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            <div className="text-xl text-gray-700 dark:text-white">{channel}</div>
                        </dd>
                    </div>
                </dl>
            </div>

            <DistributedObjectList baseURL={"ss"} distObjs={distObjs} />
        </Dashboard>
    );
}
