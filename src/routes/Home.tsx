import {Helmet} from "react-helmet";
import Dashboard from "@components/Dashboard";

export default function Home() {
    return (
        <Dashboard>
            <Helmet>
                <title>Home | Ardos</title>
            </Helmet>
            Home
        </Dashboard>
    );
}
