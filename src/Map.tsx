import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { Filter } from "./components/Filter";

import "mapbox-gl/dist/mapbox-gl.css";

// interface MovingObject {
//   id: number;
//   name: string;
//   coordinates: number[];
// }

const MapComponent: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);

  //   const movingObjects: MovingObject[] = [
  //     // Define your moving objects here
  //   ];

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoic2VhbmF0aGFuMTAiLCJhIjoiY2x1ZXBndzRzMXZ1ajJrcDY1Y2h5N3ZlNyJ9.yEdc6z0JDvIigDJyc2zfZg";

    if (mapContainer.current) {
      const map = new mapboxgl.Map({
        attributionControl: false,
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/standard",
        center: [-122.0584, 36.9905],
        zoom: 14,
        maxZoom: 19,
      });

      // Add zoom controls
      map.addControl(new mapboxgl.NavigationControl(), "top-left");
      map.addControl(new mapboxgl.FullscreenControl(), "top-left");
      map.addControl(new mapboxgl.ScaleControl(), "bottom-right");
    //   map.addControl(
    //     new mapboxgl.AttributionControl({
    //       customAttribution: "Map design by GOATED ACM HACK",
    //     }),
    //     "bottom-right"
    //   );
      map.addControl(new mapboxgl.GeolocateControl(), "top-left");

      // Add your custom markers and lines here

      // TOPOGRAPHICAL MAP
      //   map.on('load', () => {
      //     map.addLayer({
      //       id: 'terrain-data',
      //       type: 'line',
      //       source: {
      //         type: 'vector',
      //         url: 'mapbox://mapbox.mapbox-terrain-v2'
      //       },
      //       'source-layer': 'contour'
      //     });
      //   });

      // Clean up on unmount
      return () => map.remove();
    }
  }, []);

  return (
    <>
      <div
        ref={mapContainer}
        style={{ position: "absolute", top: 0, bottom: 0, width: "100%" }}
      />
      <Filter label="asdsad"></Filter>
    </>
  );
};

export default MapComponent;
