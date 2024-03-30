import {FormEvent, FunctionComponent, useContext, useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import toast from "react-hot-toast";
import WsContext from "@context/WsContext";
import ardosLogo from "../img/ardosLogo.png";

const Login: FunctionComponent = () => {
    const {setAuthed, setName, connect, subscribe, unsubscribe} = useContext(WsContext);

    const [host, setHost] = useState("localhost");
    const [port, setPort] = useState("7781");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [useSSL, setUseSSL] = useState(true);

    useEffect(() => {
        // Automatic login during development.
        if (process.env.DEV_LOG) {
            ardosConnect("ws://localhost:7781", "ardos", "ardos");
        }

        return () => unsubscribe?.("auth");
    }, []);

    function ardosConnect(url: string, username: string, password: string) {
        subscribe?.("auth", (data: any) => {
            if (data["success"] === true) {
                toast.success("Logged in");
                setName?.(data["name"]);
                setAuthed?.(true);
            } else {
                toast.error("Incorrect username or password!");
            }
        });

        connect?.(url, username, password);
    }

    function handleLogin(e: FormEvent) {
        e.preventDefault();

        const url = useSSL ? `wss://${host}:${port}` : `ws://${host}:${port}`;
        ardosConnect(url, username, password);
    }

    return (
        <div className="min-h-screen bg-gray-300 dark:bg-gray-700 flex flex-col">
            <Helmet>
                <title>Login | Ardos</title>
            </Helmet>

            <div className="py-10">
                <header>
                    <img
                        className={"max-w-7xl text-center mx-auto px-4 sm:px-6 lg:px-8 md:h-56 h-32"}
                        src={ardosLogo}
                        alt={"Ardos Logo"}
                    />

                    <div className="max-w-7xl text-center mx-auto px-4 py-8 sm:px-6 lg:px-8">
                        <h1 className="text-5xl font-bold leading-tight text-white border-black">Ardos Login</h1>
                    </div>
                </header>

                <main className={"px-5"}>
                    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                            <form className="space-y-6" onSubmit={handleLogin}>
                                <div>
                                    <label htmlFor="host" className="block text-sm font-medium text-gray-700">
                                        Host
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="host"
                                            name="host"
                                            type="text"
                                            autoComplete="host"
                                            required
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            value={host}
                                            onChange={(e) => setHost(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="port" className="block text-sm font-medium text-gray-700">
                                        Port
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="port"
                                            name="port"
                                            type="text"
                                            autoComplete="port"
                                            required
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            value={port}
                                            onChange={(e) => setPort(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Username
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="username"
                                            name="username"
                                            type="text"
                                            autoComplete="username"
                                            required
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="password"
                                            required
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            id="ssl"
                                            name="ssl"
                                            type="checkbox"
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                            checked={useSSL}
                                            onChange={(e) => setUseSSL(e.target.checked)}
                                        />
                                        <label htmlFor="ssl" className="ml-2 block text-sm text-gray-900">
                                            Use SSL
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Connect
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Login;
