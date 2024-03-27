import {useState} from "react";

export default function useAuth() {
    const [authed, setAuthed] = useState(false);
    const [url, setUrl] = useState("");

    return {
        authed,
        url,
        setAuthed,
        setUrl,
    };
}
