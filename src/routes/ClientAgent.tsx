import {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet";
import Dashboard from "@components/Dashboard";
import WsContext from "@context/WsContext";
import Loading from "@components/Loading";
import NotAvailable from "@components/NotAvailable";
import {InformationCircleIcon} from "@heroicons/react/20/solid";

const AUTH_STATES = {
    0: "New",
    1: "Anonymous",
    2: "Established",
};

type ClientInfo = {
    channel: number;
    ip: string;
    port: number;
    state: 0 | 1 | 2;
    channels: number;
    postRemoves: number;
};

export default function ClientAgent() {
    const {send, subscribe, unsubscribe} = useContext(WsContext);

    const [loading, setLoading] = useState(true);
    const [available, setAvailable] = useState(false);
    const [listenIp, setListenIp] = useState("");
    const [listenPort, setListenPort] = useState(0);
    const [legacy, setLegacy] = useState(false);
    const [clients, setClients] = useState<ClientInfo[]>([]);

    useEffect(() => {
        subscribe?.("ca:init", (data: any) => {
            if (data["success"] === false) {
                setAvailable(false);
                setLoading(false);
                return;
            }

            setAvailable(true);
            setListenIp(data["listenIp"]);
            setListenPort(data["listenPort"]);
            setLegacy(data["legacy"]);
            setClients(data["clients"]);

            setLoading(false);
        });

        send?.("ca", {msg: "init"});

        return () => unsubscribe?.("ca:init");
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (!available) {
        return <NotAvailable name={"Client Agent"} />;
    }

    return (
        <Dashboard>
            <Helmet>
                <title>Client Agent | Ardos</title>
            </Helmet>

            {legacy && (
                <div className="rounded-md bg-blue-50 p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-blue-700">
                                Ardos has been compiled in <span className={"font-extrabold"}>LEGACY</span> mode. See
                                GitHub for more information.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className={"pb-8"}>
                <h1 className={"text-4xl font-bold text-gray-700 dark:text-white"}>Host (Listen) Details</h1>
                <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                    <div className="pt-6 sm:flex">
                        <dt className="text-2xl font-medium text-gray-700 dark:text-white sm:w-64 sm:flex-none sm:pr-6">
                            IP
                        </dt>
                        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            <div className="text-xl text-gray-700 dark:text-white">{listenIp}</div>
                        </dd>
                    </div>
                    <div className="pt-6 sm:flex">
                        <dt className="text-2xl font-medium text-gray-700 dark:text-white sm:w-64 sm:flex-none sm:pr-6">
                            Port
                        </dt>
                        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            <div className="text-xl text-gray-700 dark:text-white">{listenPort}</div>
                        </dd>
                    </div>
                </dl>
            </div>

            <div className={"py-8"}>
                <h1 className={"text-4xl font-bold text-gray-700 dark:text-white"}>Connected Participants</h1>
                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                            >
                                                Channel
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                Remote Address
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                Auth State
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                # Channels
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                # Post-removes
                                            </th>
                                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                                <span className="sr-only">View</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {clients.map((client, idx) => (
                                            <tr key={idx}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                    {client.channel}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {client.ip}:{client.port}
                                                </td>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                    {AUTH_STATES[client.state]}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {client.channels}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {client.postRemoves}
                                                </td>
                                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                    <Link
                                                        to={`/ca/${client.channel}`}
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        View<span className="sr-only">, {client.channel}</span>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Dashboard>
    );
}
