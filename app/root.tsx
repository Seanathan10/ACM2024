import React from "react";

import { Outlet, Scripts } from "@remix-run/react";

// import ReactMapboxGl from "react-mapbox-gl";
import mapboxgl from 'mapbox-gl'
import { Layer, Feature } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import MapComponent from "./Map";

import { useRef, useEffect } from 'react'

import 'mapbox-gl/dist/mapbox-gl.css';

import type { LinksFunction } from "@remix-run/node";
// import { Map, Marker } from "pigeon-maps";

import "./tailwind.css";

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
	// const Map = ReactMapboxGl({
	// 	accessToken:
  //     ""
  // });


  const mapRef = useRef<Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = '';
    
    if (mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11', // Add a style
        center: [0, 0], // Set initial coordinates
        zoom: 2, // Set initial zoom level
      });
    }

    return () => {
      mapRef.current?.remove();
    };
  }, []);


  

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link
          href="https://api.mapbox.com/mapbox-gl-js/v1.10.1/mapbox-gl.css"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* <Map
          height={900}
          defaultCenter={[36.995544, -122.06037]}
          defaultZoom={15}
        >
          <Marker width={50} anchor={[50.879, 4.6997]} />
        </Map> */}

        {/* <Map
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: "100vh",
            width: "100vw",
          }}
        >
          <Layer
            type="symbol"
            id="marker"
            layout={{ "icon-image": "marker-15" }}
          >
            <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
          </Layer>
        </Map> */}

        {/* <div id="map-container" ref={mapContainerRef} style={{ width: "100%", height: "100vh" }} /> */}

        {/* <Scripts /> */}
        <p>Hello</p>
        <div>
          <MapComponent />
        </div>

      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
