import MapComponent from "./components/Map";
import { useEffect, useState } from "react";
import { getBcycleInformationJSON, getBcycleStatusJSON } from "./api/BCycle";
import { SidePanel } from "./components/SidePanel";

export default function App() {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [selectedStation, setSelectedStation] = useState(null);
  const [selectedStationIndex, setSelectedStationIndex] = useState(-1)

  const handleDrawerOpen = (station: any, index: number) => {
    setSelectedStation(station); // Set the selected station
    setSelectedStationIndex(index)
    setSideBarOpen(true);
  };

  const handleDrawerClose = () => {
    setSideBarOpen(false);
    setSelectedStation(null); // Clear the selected station when closing
  };

  const [statusData, setStatusData] = useState({
    isLoading: true,
    error: null,
  });
  const [informationData, setInformationData] = useState({
    data: {
      stations: [],
    },
  });

  const [filterData, setFilterData] = useState({
    onCampus: true,
    offCampus: true,
    onlyAvailable: false
  })

  useEffect(() => {
    async function fetchData() {
      const status = await getBcycleStatusJSON();
      const information = await getBcycleInformationJSON();
      setStatusData(status);
      setInformationData(information);
    }
    fetchData();
    // Set up persistent updates every minute
    const intervalId = setInterval(fetchData, 60000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <MapComponent
        information={informationData}
        status={statusData}
        filters={filterData}
        setFilters={(onCampus, offCampus, onlyAvailable) => setFilterData({onCampus, offCampus, onlyAvailable})}      
        openSideBar={handleDrawerOpen}
      />

      <SidePanel
        isOpen={sideBarOpen}
        openSideBar={handleDrawerOpen}
        closeSideBar={handleDrawerClose}
        station={selectedStation} // Pass the selected station to the SidePanel
        stationIndex={selectedStationIndex}
        status={statusData}
        information={informationData}
      />
    </>
  );
}
