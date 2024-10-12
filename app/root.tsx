import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useSearchParams,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";
import { useEffect, useState } from "react";
import { getBcycleInformationJSON, getBcycleStatusJSON } from "api/BCycle";

export const links: LinksFunction = () => [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
    },
    {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
    },
];

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export default function App() {
    const [statusData, setStatusData] = useState(null)
    const [informationData, setInformationData] = useState(null)
    useEffect(() => {
        async function fetchData() {
            const statusJson = await getBcycleStatusJSON()
            const informationJson = await getBcycleInformationJSON()
            setStatusData(JSON.parse(statusJson))
            setInformationData(JSON.parse(informationJson))
        }
        fetchData()
    }, [])
    return <>
    Hello
    </>
    // return <Outlet />;
}
