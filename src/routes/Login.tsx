import {FormEvent, FunctionComponent, useState} from "react";
import {Helmet} from "react-helmet";
import useWebSocket from "react-use-websocket";
import ardosLogo from "../img/ardosLogo.png";

type LoginProps = {
    url: string;
    setAuthed: Function;
    setUrl: Function;
};

const Login: FunctionComponent<LoginProps> = (props) => {
    const {sendJsonMessage, readyState} = useWebSocket(props.url, {share: true}, false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [submitDisabled, setSubmitDisabled] = useState(false);

    function handleLogin(event: FormEvent) {
        event.preventDefault();
        setSubmitDisabled(true);
    }

    return (
        <div className="min-h-screen bg-[#007BB8] flex flex-col">
            <Helmet>
                <title>Login | Ardos</title>
            </Helmet>

            <div className="py-10">
                <header>
                    <img
                        className={"max-w-7xl text-center mx-auto px-4 sm:px-6 lg:px-8 h-16"}
                        src={ardosLogo}
                        alt={"Ardos Logo"}
                    />

                    <div className="max-w-7xl text-center mx-auto px-4 py-8 sm:px-6 lg:px-8">
                        <h1 className="text-5xl font-bold leading-tight text-white border-black">Admin Login</h1>
                    </div>
                </header>

                <main className={"px-5"}>
                    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                            <form className="space-y-6" onSubmit={handleLogin}>
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
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        disabled={submitDisabled}
                                    >
                                        Sign in
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
