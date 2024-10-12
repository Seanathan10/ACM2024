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
  information: any;
  status: any;
}

const MapComponent: React.FC<MapProps> = ({ information, status }) => {
  const mapContainer = useRef<HTMLDivElement>(null);

  //   const movingObjects: MovingObject[] = [
  //     // Define your moving objects here
  //   ];

  useEffect(() => {
    console.log("Updated statusData:", JSON.stringify(status, null, 2));
  }, [status]);

  useEffect(() => {
    console.log(
      "Updated informationData:",
      JSON.stringify(information, null, 2)
    );
  }, [information]);

  const informationData = JSON.stringify(information, null, 2);
  console.log("c", informationData);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoic2VhbmF0aGFuMTAiLCJhIjoiY2x1ZXBndzRzMXZ1ajJrcDY1Y2h5N3ZlNyJ9.yEdc6z0JDvIigDJyc2zfZg";

    const bounds = [
      [-122.100, 25.948], // Southwest coordinates
      [-121.949, 39.005], // Northeast coordinates
    ];

    if (mapContainer.current) {
      const map = new mapboxgl.Map({
        attributionControl: false,
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/standard",
        center: [-122.0584, 36.9905],
        zoom: 14,
        maxZoom: 19,
        maxBounds: bounds,
      });

      // Add zoom controls
      map.addControl(new mapboxgl.ScaleControl(), "bottom-right");
      map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
      map.addControl(new mapboxgl.FullscreenControl(), "bottom-right");
      map.addControl(new mapboxgl.GeolocateControl(), "bottom-right");

      class CustomZoomControl {
        onAdd(map) {
          this.map = map;

          this.container = document.createElement("div");
          this.container.className = " mapboxgl-ctrl mapboxgl-ctrl-group";

          this.input = document.createElement("input");
          this.input.type = "range";
          this.input.min = 118;
          this.input.max = 180;
          this.createAttribute(this.input, "value", map.getZoom() * 10);
          this.input.className = "slider";
          this.input.id = "myRange";

          this.container.appendChild(this.input);

          // Update the current slider value (each time you drag the slider handle)
          this.input.oninput = function () {
            map.setZoom(this.value / 10);
          };

          return this.container;
        }
        onRemove() {
          this.container.parentNode.removeChild(this.container);
          this.map = undefined;
        }

        createAttribute(obj, attrName, attrValue) {
          var att = document.createAttribute(attrName);
          att.value = attrValue;
          obj.setAttributeNode(att);
        }

        update() {
          let zoom = map.getZoom() * 10;
          if (this.input.value != zoom) this.input.value = zoom;
        }
      }

      map.on("load", function () {
        const zoomControl = new CustomZoomControl();
        map.addControl(zoomControl, "top-right");

        map.on("zoom", function () {
          zoomControl.update();
        });
      });

      class CustomPitchControl {
        onAdd(map) {
          this.map = map;

          this.container = document.createElement("div");
          this.container.className = " mapboxgl-ctrl mapboxgl-ctrl-group";

          this.input = document.createElement("input");
          this.input.type = "range";
          this.input.min = 1;
          this.input.max = 800;
          this.createAttribute(this.input, "value", map.getPitch() * 10);
          this.input.className = "slider";
          this.input.id = "myRange";

          this.container.appendChild(this.input);

          // Update the current slider value (each time you drag the slider handle)
          this.input.oninput = function () {
            map.setPitch(this.value / 10);
          };

          return this.container;
        }
        onRemove() {
          this.container.parentNode.removeChild(this.container);
          this.map = undefined;
        }

        createAttribute(obj, attrName, attrValue) {
          var att = document.createAttribute(attrName);
          att.value = attrValue;
          obj.setAttributeNode(att);
        }

        update() {
          let pitch = map.getPitch() * 10;
          if (this.input.value != zoom) this.input.value = pitch;
        }
      }

      map.on("load", function () {
        const pitchControl = new CustomPitchControl();
        map.addControl(pitchControl, "top-right");

        map.on("pitch", function () {
          pitchControl.update();
        });
      });

      //   map.addControl(
      //     new mapboxgl.AttributionControl({
      //       customAttribution: "Map design by GOATED ACM HACK",
      //     }),
      //     "bottom-right"
      //   );

      // Add your custom markers and lines here
      console.log("s", informationData);
      if (information && information.data && information.data.stations) {
        information.data.stations.map((station: any) => {
          console.log("z", station);

          const marker = new mapboxgl.Marker()
            .setLngLat([station.lon, station.lat])
            .addTo(map);

          marker.getElement().addEventListener("click", () => {
            alert(
              "Station: " + station.name + "\n" + "Address: " + station.address
            );
          });
        });
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
  }, [information, informationData, status]);

  return (
    <>
      <div
        ref={mapContainer}
        style={{ position: "absolute", top: 0, bottom: 0, width: "100%" }}
      />
      <FilterButton label={"abc"} onClick={() => {}} />
    </>
  );
};

export default MapComponent;
