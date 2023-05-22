import { useState, useEffect } from 'react';

export default function Auth () {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsAuthenticated(true);
        }, 3000)
    }, []);

    useEffect(() => {
        if (isAuthenticated && window.location !== window.parent.location) {
            window.parent.postMessage(
                { userData: { cartCount: 5, avatar: "avatar.svg" } },
                "https://premier-pharma.webflow.io"
            )
        }
    }, [isAuthenticated]);

    return !isAuthenticated && "Loading ..."
}
