import {useContext, useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import Dashboard from "@components/Dashboard";
import WsContext from "@context/WsContext";
import Loading from "@components/Loading";
import NotAvailable from "@components/NotAvailable";
import DistributedObjectList, {DistributedObject} from "@components/DistributedObjectList";

export default function DatabaseStateServer() {
    const {send, subscribe, unsubscribe} = useContext(WsContext);

    const [loading, setLoading] = useState(true);
    const [available, setAvailable] = useState(false);
    const [channel, setChannel] = useState(0);
    const [minDoId, setMinDoId] = useState(0);
    const [maxDoId, setMaxDoId] = useState(0);
    const [distObjs, setDistObjs] = useState<DistributedObject[]>([]);

    useEffect(() => {
        subscribe?.("dbss:init", (data: any) => {
            if (data["success"] === false) {
                setAvailable(false);
                setLoading(false);
                return;
            }

            setAvailable(true);
            setChannel(data["dbChannel"]);
            setMinDoId(data["minDoId"]);
            setMaxDoId(data["maxDoId"]);
            setDistObjs(data["distObjs"]);

            setLoading(false);
        });

        send?.("dbss", {msg: "init"});

        return () => unsubscribe?.("dbss:init");
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (!available) {
        return <NotAvailable name={"Database State Server"} />;
    }

    return (
        <Dashboard>
            <Helmet>
                <title>Database State Server | Ardos</title>
            </Helmet>

            <div className={"pb-8"}>
                <h1 className={"text-4xl font-bold text-gray-700 dark:text-white"}>Configuration</h1>
                <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                    <div className="pt-6 sm:flex">
                        <dt className="text-2xl font-medium text-gray-700 dark:text-white sm:w-64 sm:flex-none sm:pr-6">
                            Database Channel
                        </dt>
                        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            <div className="text-xl text-gray-700 dark:text-white">{channel}</div>
                        </dd>
                    </div>
                    <div className="pt-6 sm:flex">
                        <dt className="text-2xl font-medium text-gray-700 dark:text-white sm:w-64 sm:flex-none sm:pr-6">
                            Minimum DoId
                        </dt>
                        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            <div className="text-xl text-gray-700 dark:text-white">{minDoId}</div>
                        </dd>
                    </div>
                    <div className="pt-6 sm:flex">
                        <dt className="text-2xl font-medium text-gray-700 dark:text-white sm:w-64 sm:flex-none sm:pr-6">
                            Maximum DoId
                        </dt>
                        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            <div className="text-xl text-gray-700 dark:text-white">{maxDoId}</div>
                        </dd>
                    </div>
                </dl>
            </div>

            <DistributedObjectList baseURL={"dbss"} distObjs={distObjs} />
        </Dashboard>
    );
}
