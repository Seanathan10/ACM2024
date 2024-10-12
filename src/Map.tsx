/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { FilterButton } from "./components/Buttons";

import "mapbox-gl/dist/mapbox-gl.css";

// interface MovingObject {
//   id: number;
//   name: string;
//   coordinates: number[];
// }

interface MapProps {
  information: any,
  status: any
}


const MapComponent: React.FC<MapProps> = ({information, status}) => {
  const mapContainer = useRef<HTMLDivElement>(null);

  //   const movingObjects: MovingObject[] = [
  //     // Define your moving objects here
  //   ];

  useEffect(() => {
    console.log('Updated statusData:', JSON.stringify(status, null, 2));
  }, [status]);

  useEffect(() => {
    console.log('Updated informationData:', JSON.stringify(information, null, 2));
  }, [information]);



  const informationData = JSON.stringify(information, null, 2)
  console.log('c', informationData)
  

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
      map.addControl(new mapboxgl.ScaleControl(), "bottom-right");
      map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
      map.addControl(new mapboxgl.FullscreenControl(), "bottom-right");
      map.addControl(new mapboxgl.GeolocateControl(), "bottom-right");
      //   map.addControl(
    //     new mapboxgl.AttributionControl({
    //       customAttribution: "Map design by GOATED ACM HACK",
    //     }),
    //     "bottom-right"
    //   );

      // Add your custom markers and lines here
      console.log('s',  informationData)
      if (information && information.data && information.data.stations) {
        information.data.stations.map((station: any) => {
          console.log('z', station)
          const marker=new mapboxgl.Marker()
            .setLngLat([station.lon, station.lat])
            .addTo(map);
        })
      }
      


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
  }, [information, status]);

  return (
    <>
      <div
        ref={mapContainer}
        style={{ position: "absolute", top: 0, bottom: 0, width: "100%" }}
      />
      <FilterButton label={'abc'} onClick={() => {}}/>
    </>
  );
};

export default MapComponent;
