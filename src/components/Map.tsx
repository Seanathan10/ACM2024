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
  const mapInstance = useRef<Map | null>(null); // To store the map instance
  const markersRef = useRef<Marker[]>([]); // To store markers

  useEffect(() => {
    if (mapInstance.current === null && mapContainer.current) {
      mapboxgl.accessToken =
        "pk.eyJ1Ijoic2VhbmF0aGFuMTAiLCJhIjoiY2x1ZXBndzRzMXZ1ajJrcDY1Y2h5N3ZlNyJ9.yEdc6z0JDvIigDJyc2zfZg";

      const bounds: [number, number, number, number] = [
        -122.1,
        36.948, // Southwest coordinates
        -121.949,
        37.005, // Northeast coordinates
      ];

      const map = new mapboxgl.Map({
        attributionControl: false,
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/standard",
        center: [-122.0584, 36.9905],
        zoom: 14,
        maxZoom: 21,
        maxBounds: bounds,
      });

      map.addControl(new mapboxgl.ScaleControl(), "bottom-right");
      map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
      map.addControl(new mapboxgl.FullscreenControl(), "bottom-right");
      map.addControl(new mapboxgl.GeolocateControl(), "bottom-right");

      mapInstance.current = map;
    }
  }, []);

  useEffect(() => {
    const map = mapInstance.current;
    if (!map) return; // Skip if map hasn't been initialized yet

    // Remove existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers based on updated filters
    if (information && information.data && information.data.stations) {
      information.data.stations.forEach((station, index) => {
        const isOnCampus = station.lat > 36.9765 && station.lon < -122.045;

        if (
          (filters.onCampus && isOnCampus) ||
          (filters.offCampus && !isOnCampus)
        ) {
          const statusInfo = status.data.stations[index];
          if (
            statusInfo.is_renting &&
            (!filters.onlyAvailable || statusInfo.num_bikes_available > 0)
          ) {
            const popup = new mapboxgl.Popup({ offset: 25, closeButton: false })
              .setHTML(`<h3>${station.name}</h3><p>${station.address}</p>`);

            const imgElement = document.createElement("img");
            imgElement.src =
              markers[
                `marker_${Math.min(statusInfo.num_bikes_available, 30)}`
              ];

            const marker = new mapboxgl.Marker({ element: imgElement })
              .setLngLat([station.lon, station.lat])
              .setPopup(popup)
              .addTo(map);

            marker.getElement().addEventListener("click", () =>
              openSideBar(station, index)
            );

            markersRef.current.push(marker);
          }
        }
      });
    }
  }, [information, status, filters, openSideBar]);

  const filterButtons: FilterButtonData[] = [
    {
      label: "On Campus",
      key: "onCampus",
      filterEnabled: filters.onCampus,
      filterFunction: () =>
        setFilters(!filters.onCampus, filters.offCampus, filters.onlyAvailable),
    },
    {
      label: "Off Campus",
      key: "offCampus",
      filterEnabled: filters.offCampus,
      filterFunction: () =>
        setFilters(filters.onCampus, !filters.offCampus, filters.onlyAvailable),
    },
    {
      label: "Has Available Bikes",
      key: "onlyAvailable",
      filterEnabled: filters.onlyAvailable,
      filterFunction: () =>
        setFilters(filters.onCampus, filters.offCampus, !filters.onlyAvailable),
    },
  ];

  return (
    <>
      <div
        ref={mapContainer}
        style={{ position: "absolute", top: 0, bottom: 0, width: "100%" }}
      />
      <Filter filterButtonData={filterButtons} stations={status} />
    </>
  );
};

export default MapComponent;