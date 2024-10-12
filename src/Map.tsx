import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

import 'mapbox-gl/dist/mapbox-gl.css';

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
    mapboxgl.accessToken = "pk.eyJ1Ijoic2VhbmF0aGFuMTAiLCJhIjoiY2x1ZXBndzRzMXZ1ajJrcDY1Y2h5N3ZlNyJ9.yEdc6z0JDvIigDJyc2zfZg";

    if (mapContainer.current) {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/standard",
        center: [-122.0584, 36.9905],
        zoom: 14,
        maxZoom: 18,
      });

      // Add zoom controls
      map.addControl(new mapboxgl.NavigationControl(), "top-left");

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
    <div
      ref={mapContainer}
      style={{ position: "absolute", top: 0, bottom: 0, width: "100%" }}
    />
  );
};

export default MapComponent;