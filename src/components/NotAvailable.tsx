import {FunctionComponent} from "react";
import {Helmet} from "react-helmet";
import Dashboard from "@components/Dashboard";
import {XCircleIcon} from "@heroicons/react/20/solid";

const NotAvailable: FunctionComponent<{name: string}> = (props) => {
    return (
        <Dashboard>
            <Helmet>
                <title>{props.name} | Ardos</title>
            </Helmet>
            <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">Unavailable</h3>
                        <div className="mt-2 text-sm text-red-700">
                            <p>The {props.name} is not enabled on this cluster.</p>
                        </div>
                    </div>
                </div>
            </div>
        </Dashboard>
    );
};

export default NotAvailable;
