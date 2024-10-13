import React, { useEffect, useRef, useState } from "react";
import mapboxgl, { Map, Marker } from "mapbox-gl";
import { Filter, FilterButtonData } from "./Filter";
import { SidePanel } from "./SidePanel";

import "../App.css";

import "mapbox-gl/dist/mapbox-gl.css";

// const filters = {

// }
// interface MovingObject {
//   id: number;
//   name: string;
//   coordinates: number[];
// }

const markers = {};

for (let i = 0; i <= 30; i++) {
  try {
    const module = await import(`../assets/markers/marker-${i}.svg`);
    markers[`marker_${i}`] = module.default;
  } catch (error) {
    console.error(`Failed to load marker-${i}.svg:`, error);
  }
}

interface MapProps {
  information: {
    data: {
      stations: {
        name: string;
        address: string;
        lon: number;
        lat: number;
        stationID: string;
      }[];
    };
  };
  status: {
    data: {
      stations: {
        num_bikes_available: number;
        is_renting: boolean;
      }[];
    };
    isLoading: boolean;
    error: string | null;
  };
  filters: {
    onCampus: boolean;
    offCampus: boolean;
    onlyAvailable: boolean;
  },
  setFilters: (onCampus: boolean, offCampus: boolean, onlyAvailable: boolean) => void;
  openSideBar: (station: any, index: number) => void;
//   closeSideBar: (open: boolean) => void;
}

const MapComponent: React.FC<MapProps> = ({
  information,
  status,
  filters,
  setFilters,
  openSideBar,
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoic2VhbmF0aGFuMTAiLCJhIjoiY2x1ZXBndzRzMXZ1ajJrcDY1Y2h5N3ZlNyJ9.yEdc6z0JDvIigDJyc2zfZg";

    const bounds: [number, number, number, number] = [
      -122.1,
      36.948, // Southwest coordinates
      -121.949,
      37.005, // Northeast coordinates
    ];

    if (mapContainer.current) {
      const map = new mapboxgl.Map({
        attributionControl: false,
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/standard",
        center: [-122.0584, 36.9905],
        zoom: 14,
        maxZoom: 21,
        maxBounds: bounds,
      });

      // Add zoom controls
      map.addControl(new mapboxgl.ScaleControl(), "bottom-right");
      map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
      map.addControl(new mapboxgl.FullscreenControl(), "bottom-right");
      map.addControl(new mapboxgl.GeolocateControl(), "bottom-right");

      class CustomZoomControl {
        container!: HTMLDivElement;
        input!: HTMLInputElement;
        map: mapboxgl.Map | undefined;

        onAdd(map: mapboxgl.Map) {
          this.map = map;

          this.container = document.createElement("div");
          this.container.className = " mapboxgl-ctrl mapboxgl-ctrl-group";

          this.input = document.createElement("input");
          this.input.type = "range";
          this.input.min = "132";
          this.input.max = "180";
          this.createAttribute(this.input, "value", map.getZoom() * 10);
          this.input.className = "slider";
          this.input.id = "myRange";

          this.container.appendChild(this.input);

          // Update the current slider value (each time you drag the slider handle)
          this.input.oninput = () => {
            map.setZoom(Number(this.input.value) / 10);
          };

          return this.container;
        }
        onRemove() {
          if (this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
          }
          this.map = undefined;
        }

        createAttribute(
          obj: HTMLInputElement,
          attrName: string,
          attrValue: string | number
        ) {
          const att = document.createAttribute(attrName);
          att.value = String(attrValue);
          obj.setAttributeNode(att);
        }

        update() {
          const zoom = map.getZoom() * 10;
          if (Number(this.input.value) !== zoom)
            this.input.value = zoom.toString();
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
        container!: HTMLDivElement;
        input!: HTMLInputElement;
        map: mapboxgl.Map | undefined;

        onAdd(map: Map) {
          this.map = map;

          this.container = document.createElement("div");
          this.container.className = " mapboxgl-ctrl mapboxgl-ctrl-group";

          this.input = document.createElement("input");
          this.input.type = "range";
          this.input.min = "1";
          this.input.max = "800";
          this.createAttribute(this.input, "value", map.getPitch() * 10);
          this.input.className = "slider";
          this.input.id = "myRange";

          this.container.appendChild(this.input);

          // Update the current slider value (each time you drag the slider handle)
          this.input.oninput = () => {
            map.setPitch(Number(this.input.value) / 10);
          };

          return this.container;
        }
        onRemove() {
          if (this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
          }
          this.map = undefined;
        }

        createAttribute(
          obj: HTMLInputElement,
          attrName: string,
          attrValue: string | number
        ) {
          const att = document.createAttribute(attrName);
          att.value = String(attrValue);
          obj.setAttributeNode(att);
        }

        update() {
          const pitch = map.getPitch() * 10;
          if (this.input.value !== pitch.toString())
            this.input.value = pitch.toString();
        }
      }

      map.on("load", function () {
        const pitchControl = new CustomPitchControl();
        map.addControl(pitchControl, "top-right");

        map.on("pitch", function () {
          pitchControl.update();
        });
      });

      // Add your custom markers and lines here
      if (information && information.data && information.data.stations) {
        information.data.stations.map(
          (
            station: {
              name: string;
              address: string;
              lon: number;
              lat: number;
              stationID: string;
            },
            index: number
          ) => {

            const isOnCampus = (station.lat > 36.9765 && station.lon < -122.045)
            const popup = new mapboxgl.Popup({
              offset: 25,
              className: "main-popup",
              closeButton: false,
            }).setHTML(`<h3>${station.name}</h3><p>${station.address}</p>`);

            let marker;

            if (
              ((filters.onCampus && isOnCampus) || (filters.offCampus && !isOnCampus))
            ) {
              if (
                status &&
                status.data &&
                status.data.stations &&
                status.data.stations[index] &&
                status.data.stations[index].is_renting &&
                (!filters.onlyAvailable || status.data.stations[index].num_bikes_available > 0)
              ) {
                const imgElement = document.createElement("img");
  
                imgElement.src =
                  markers[
                    `marker_${Math.min(
                      status.data.stations[index].num_bikes_available,
                      30
                    )}`
                  ];
  
                marker = new mapboxgl.Marker({ element: imgElement }).setLngLat([
                  station.lon,
                  station.lat,
                ]);
              } else if (!filters.onlyAvailable) {
                marker = new mapboxgl.Marker({ color: "#808080" }).setLngLat([
                  station.lon,
                  station.lat,
                ]);
              }
            }

            if (marker) {
              marker.setPopup(popup);
              marker.addTo(map);
  
              marker.getElement().addEventListener("mouseenter", () => {
                popup.addTo(map);
              });
              marker.getElement().addEventListener("mouseleave", () => {
                popup.remove();
              });
  
              marker.getElement().addEventListener("click", () => {
                openSideBar(station, index); // Pass the station object to openSideBar
              });
            }

            
          }
        );
      }

      return () => map.remove();
    }
  }, [information, status, filters]);





  console.log("filters", filters)

  const filterButtons: FilterButtonData[] = [
    {
      label: "On Campus",
      key: "onCampus",
      filterEnabled: filters.onCampus,
      filterFunction: () => { setFilters (!filters.onCampus, filters.offCampus, filters.onlyAvailable) },
    },
    {
      label: "Off Campus",
      key: "offCampus",
      filterEnabled: filters.offCampus,
      filterFunction: () => { setFilters (filters.onCampus, !filters.offCampus, filters.onlyAvailable) },
    },
    {
      label: "Has Available Bikes",
      key: "onlyAvailable",
      filterEnabled: filters.onlyAvailable,
      filterFunction: () => { setFilters (filters.onCampus, filters.offCampus, !filters.onlyAvailable) },
    }
  ];

  return (
    <>
      <div
        ref={mapContainer}
        style={{ position: "absolute", top: 0, bottom: 0, width: "100%" }}
      />
      <Filter
        filterButtonData={filterButtons}
        stations={status}
      ></Filter>
    </>
  );
};

export default MapComponent;
