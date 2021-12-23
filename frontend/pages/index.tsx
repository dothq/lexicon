import { useRouter } from "next/router";
import React from "react";
import { flags } from "../util/flags";

const Redirect = () => {
    const router = useRouter();

    React.useEffect(() => {
        const from = "en";
        const to = navigator.language.split("-")[0];
    
        if(flags.find(f => f.code == to)) {
            router.push(`/${from}/${to}`);
        } else {
            router.push(`/${from}/en`);
        }
    }, [])

    return <></>;
}

export default Redirect;