import {useContext, useEffect, useState} from "react";
import {CodeBlock, dracula, github} from "react-code-blocks";
import ThemeContext from "@context/ThemeContext";
import WsContext from "@context/WsContext";
import Dashboard from "@components/Dashboard";

export default function Config() {
    const {theme} = useContext(ThemeContext);
    const {send, subscribe, unsubscribe} = useContext(WsContext);

    const [config, setConfig] = useState("");

    useEffect(() => {
        subscribe?.("config", (data: any) => {
            setConfig(data["config"]);
        });

        send?.("config", {asd: "asd"});

        return () => {
            unsubscribe?.("config");
        };
    }, []);

    return (
        <Dashboard>
            <h1 className={"pb-4 text-4xl font-bold text-gray-700 dark:text-white"}>Config File</h1>

            <CodeBlock
                text={config}
                language={"yaml"}
                showLineNumbers={true}
                theme={theme === "dark" ? dracula : github}
            />
        </Dashboard>
    );
}
