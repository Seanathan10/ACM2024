import MapComponent from "./components/Map";

import { useEffect, useState } from "react";
import { getBcycleInformationJSON, getBcycleStatusJSON } from "./api/BCycle";
import { SidePanel } from "./components/SidePanel";

export default function App() {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const handleDrawerOpen = () => {
    setSideBarOpen(true);
  };

  const handleDrawerClose = () => {
    setSideBarOpen(false);
  };

  const getDrawerState = () => {
    return sideBarOpen;
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

  // Use another useEffect to log state changes

  return (
    <>
      Hello
      <MapComponent
        information={informationData}
        status={statusData}
        openSideBar={handleDrawerOpen}
        closeSideBar={handleDrawerClose}
        getDrawerState={getDrawerState}
      ></MapComponent>
      
      <SidePanel
        isOpen={getDrawerState}
        openSideBar={handleDrawerOpen}
        closeSideBar={handleDrawerClose}
        stationID="bcycle_santacruz_7437"
      />
    </>
  );
}
