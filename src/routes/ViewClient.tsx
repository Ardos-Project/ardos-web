import {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Helmet} from "react-helmet";
import Dashboard from "@components/Dashboard";
import WsContext from "@context/WsContext";
import Loading from "@components/Loading";
import NotAvailable from "@components/NotAvailable";

const AUTH_STATES = {
    0: "New",
    1: "Anonymous",
    2: "Established",
};

type OwnedObject = {
    doId: number;
    clsName: string;
    parent: number;
    zone: number;
};

type SessionObject = {
    doId: number;
};

type Interest = {
    id: number;
    parent: number;
    zones: number[];
};

export default function ViewClient() {
    const {channelHi, channelLo} = useParams();

    const {send, subscribe, unsubscribe} = useContext(WsContext);

    const [loading, setLoading] = useState(true);
    const [available, setAvailable] = useState(false);
    const [ip, setIp] = useState("");
    const [port, setPort] = useState(0);
    const [state, setState] = useState<0 | 1 | 2>(0);
    const [channels, setChannels] = useState(0);
    const [postRemoves, setPostRemoves] = useState(0);
    const [owned, setOwned] = useState<OwnedObject[]>([]);
    const [session, setSession] = useState<SessionObject[]>([]);
    const [interests, setInterests] = useState<Interest[]>([]);

    useEffect(() => {
        if (!channelHi || !channelLo) {
            setAvailable(false);
            setLoading(false);
            return;
        }

        subscribe?.("ca:client", (data: any) => {
            if (data["success"] === false) {
                setAvailable(false);
                setLoading(false);
                return;
            }

            setAvailable(true);
            setIp(data["ip"]);
            setPort(data["port"]);
            setState(data["state"]);
            setChannels(data["channels"]);
            setPostRemoves(data["postRemoves"]);
            setOwned(data["owned"]);
            setSession(data["session"]);
            setInterests(data["interests"]);

            setLoading(false);
        });

        send?.("ca", {msg: "client", channelHi: parseInt(channelHi), channelLo: parseInt(channelLo)});

        return () => unsubscribe?.("ca:client");
    }, [channelHi, channelLo]);

    if (loading) {
        return <Loading />;
    }

    if (!available) {
        return <NotAvailable name={"Client Agent"} />;
    }

    return (
        <Dashboard>
            <Helmet>
                <title>
                    Client {channelHi}
                    {channelLo} | Ardos
                </title>
            </Helmet>

            <div className={"pb-8"}>
                <h1 className={"text-4xl font-bold text-gray-700 dark:text-white"}>Client Info</h1>
                <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                    <div className="pt-6 sm:flex">
                        <dt className="text-2xl font-medium text-gray-700 dark:text-white sm:w-64 sm:flex-none sm:pr-6">
                            Channel
                        </dt>
                        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            <div className="text-xl text-gray-700 dark:text-white">
                                {channelHi}
                                {channelLo}
                            </div>
                        </dd>
                    </div>
                    <div className="pt-6 sm:flex">
                        <dt className="text-2xl font-medium text-gray-700 dark:text-white sm:w-64 sm:flex-none sm:pr-6">
                            Remote Address
                        </dt>
                        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            <div className="text-xl text-gray-700 dark:text-white">
                                {ip}:{port}
                            </div>
                        </dd>
                    </div>
                    <div className="pt-6 sm:flex">
                        <dt className="text-2xl font-medium text-gray-700 dark:text-white sm:w-64 sm:flex-none sm:pr-6">
                            Auth State
                        </dt>
                        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            <div className="text-xl text-gray-700 dark:text-white">{AUTH_STATES[state]}</div>
                        </dd>
                    </div>
                    <div className="pt-6 sm:flex">
                        <dt className="text-2xl font-medium text-gray-700 dark:text-white sm:w-64 sm:flex-none sm:pr-6">
                            # Channels Opened
                        </dt>
                        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            <div className="text-xl text-gray-700 dark:text-white">{channels}</div>
                        </dd>
                    </div>
                    <div className="pt-6 sm:flex">
                        <dt className="text-2xl font-medium text-gray-700 dark:text-white sm:w-64 sm:flex-none sm:pr-6">
                            # Post-removes
                        </dt>
                        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            <div className="text-xl text-gray-700 dark:text-white">{postRemoves}</div>
                        </dd>
                    </div>
                </dl>
            </div>

            <div className={"py-8"}>
                <h1 className={"text-4xl font-bold text-gray-700 dark:text-white"}>Owned Objects</h1>
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
                                                DoId
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                Class Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                Parent ID
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                Zone ID
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {owned.map((obj) => (
                                            <tr key={obj.doId}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                    {obj.doId}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {obj.clsName}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {obj.parent}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {obj.zone}
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

            <div className={"py-8"}>
                <h1 className={"text-4xl font-bold text-gray-700 dark:text-white"}>Session Objects</h1>
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
                                                DoId
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {session.map((obj) => (
                                            <tr key={obj.doId}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                    {obj.doId}
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

            <div className={"py-8"}>
                <h1 className={"text-4xl font-bold text-gray-700 dark:text-white"}>Active Interests</h1>
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
                                                Handle ID
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                            >
                                                Parent ID
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                            >
                                                Zone(s)
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {interests.map((interest) => (
                                            <tr key={interest.id}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                    {interest.id}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {interest.parent}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {interest.zones.join(", ")}
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
