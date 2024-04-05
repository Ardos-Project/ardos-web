import {FunctionComponent} from "react";
import {Link} from "react-router-dom";

export type RamFields = {
    fieldName: string;
};

export type ZoneObjects = {
    zoneId: number;
    distObjs: number[];
};

const DistributedObjectView: FunctionComponent<{
    baseURL: string;
    clsName: string;
    doId: string;
    parentId: number;
    zoneId: number;
    ownerId: number;
    size: number;
    ramFields: RamFields[];
    zoneObjects: ZoneObjects[];
}> = (props) => {
    return (
        <>
            <div className={"pb-8"}>
                <h1 className={"text-4xl font-bold text-gray-700 dark:text-white"}>Distributed Object Info</h1>
                <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                    <div className="pt-6 sm:flex">
                        <dt className="text-2xl font-medium text-gray-700 dark:text-white sm:w-64 sm:flex-none sm:pr-6">
                            DoId
                        </dt>
                        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            <div className="text-xl text-gray-700 dark:text-white">{props.doId}</div>
                        </dd>
                    </div>
                    <div className="pt-6 sm:flex">
                        <dt className="text-2xl font-medium text-gray-700 dark:text-white sm:w-64 sm:flex-none sm:pr-6">
                            Class Name
                        </dt>
                        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            <div className="text-xl text-gray-700 dark:text-white">{props.clsName}</div>
                        </dd>
                    </div>
                    <div className="pt-6 sm:flex">
                        <dt className="text-2xl font-medium text-gray-700 dark:text-white sm:w-64 sm:flex-none sm:pr-6">
                            Parent ID
                        </dt>
                        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            <div className="text-xl text-gray-700 dark:text-white">{props.parentId}</div>
                        </dd>
                    </div>
                    <div className="pt-6 sm:flex">
                        <dt className="text-2xl font-medium text-gray-700 dark:text-white sm:w-64 sm:flex-none sm:pr-6">
                            Zone ID
                        </dt>
                        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            <div className="text-xl text-gray-700 dark:text-white">{props.zoneId}</div>
                        </dd>
                    </div>
                    <div className="pt-6 sm:flex">
                        <dt className="text-2xl font-medium text-gray-700 dark:text-white sm:w-64 sm:flex-none sm:pr-6">
                            Owner ID
                        </dt>
                        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            <div className="text-xl text-gray-700 dark:text-white">{props.ownerId}</div>
                        </dd>
                    </div>
                    <div className="pt-6 sm:flex">
                        <dt className="text-2xl font-medium text-gray-700 dark:text-white sm:w-64 sm:flex-none sm:pr-6">
                            Size (Bytes)
                        </dt>
                        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            <div className="text-xl text-gray-700 dark:text-white">{props.size}</div>
                        </dd>
                    </div>
                </dl>
            </div>

            <div className={"py-8"}>
                <h1 className={"text-4xl font-bold text-gray-700 dark:text-white"}>RAM Fields</h1>
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
                                                Field Name
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {props.ramFields.map((field, idx) => (
                                            <tr key={idx}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                    {field.fieldName}
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

            {props.zoneObjects.map((zone) => (
                <div className={"py-8"}>
                    <h1 className={"text-4xl font-bold text-gray-700 dark:text-white"}>Zone {zone.zoneId}</h1>
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
                                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                                    <span className="sr-only">View</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {zone.distObjs.map((doId) => (
                                                <tr key={doId}>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                        {doId}
                                                    </td>
                                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                        <Link
                                                            to={`/${props.baseURL}/${doId}`}
                                                            className="text-indigo-600 hover:text-indigo-900"
                                                        >
                                                            View<span className="sr-only">, {doId}</span>
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
            ))}
        </>
    );
};

export default DistributedObjectView;
