import {FunctionComponent} from "react";
import {Helmet} from "react-helmet";
import Dashboard from "@components/Dashboard";
import Spinner from "@components/svg/Spinner";

const Loading: FunctionComponent = () => {
    return (
        <Dashboard>
            <Helmet>
                <title>Loading | Ardos</title>
            </Helmet>
            <Spinner />
        </Dashboard>
    );
};

export default Loading;
