import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

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
        center: [-74.0060152, 40.7127281],
        zoom: 5,
        maxZoom: 18,
      });

      // Add zoom controls
      map.addControl(new mapboxgl.NavigationControl(), "top-left");

      // Add your custom markers and lines here

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