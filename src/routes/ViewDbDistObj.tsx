import {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Helmet} from "react-helmet";
import Dashboard from "@components/Dashboard";
import WsContext from "@context/WsContext";
import Loading from "@components/Loading";
import NotAvailable from "@components/NotAvailable";
import DistributedObjectView, {RamFields, ZoneObjects} from "@components/DistributedObjectView";

export default function ViewDbDistObj() {
    const {doId} = useParams();

    const {send, subscribe, unsubscribe} = useContext(WsContext);

    const [loading, setLoading] = useState(true);
    const [available, setAvailable] = useState(false);
    const [clsName, setClsName] = useState("");
    const [parentId, setParentId] = useState(0);
    const [zoneId, setZoneId] = useState(0);
    const [ownerId, setOwnerId] = useState(0);
    const [size, setSize] = useState(0);
    const [ramFields, setRamFields] = useState<RamFields[]>([]);
    const [zoneObjects, setZoneObjects] = useState<ZoneObjects[]>([]);

    useEffect(() => {
        if (!doId) {
            setAvailable(false);
            setLoading(false);
            return;
        }

        subscribe?.("dbss:distobj", (data: any) => {
            if (data["success"] === false) {
                setAvailable(false);
                setLoading(false);
                return;
            }

            setAvailable(true);
            setClsName(data["clsName"]);
            setParentId(data["parentId"]);
            setZoneId(data["zoneId"]);
            setOwnerId(data["owner"]);
            setSize(data["size"]);
            setRamFields(data["ram"]);
            setZoneObjects(data["zones"]);

            setLoading(false);
        });

        send?.("dbss", {msg: "distobj", doId: parseInt(doId)});

        return () => unsubscribe?.("dbss:distobj");
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (!available) {
        return <NotAvailable name={"State Server"} />;
    }

    return (
        <Dashboard>
            <Helmet>
                <title>Distributed Object {doId} | Ardos</title>
            </Helmet>

            <DistributedObjectView
                baseURL={"dbss"}
                clsName={clsName}
                doId={doId!}
                parentId={parentId}
                zoneId={zoneId}
                ownerId={ownerId}
                size={size}
                ramFields={ramFields}
                zoneObjects={zoneObjects}
            />
        </Dashboard>
    );
}
