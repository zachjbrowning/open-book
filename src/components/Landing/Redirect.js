import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom'; 

/*
    REDIRECT COMPONENT
    Just catches all invalid URLS
*/
export default function Redirect() {
    const history = useHistory();
    console.log("REDIRECTIN")
    useEffect(() => {
        history.push("/uh-oh/")
    }, [])

    return (
        <div>
            REDIRECT...
        </div>
    )
}
