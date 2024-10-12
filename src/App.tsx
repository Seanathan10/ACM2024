import MapComponent from "./Map";

import { useEffect, useState } from "react";
import { getBcycleInformationJSON, getBcycleStatusJSON } from "./api/BCycle";

export default function App() {
  const [statusData, setStatusData] = useState({
    isLoading: true,
    error: null
  });
  const [informationData, setInformationData] = useState({
    data: {
      stations: []
    }
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
      <MapComponent information = {informationData} status={statusData}></MapComponent>
    </>
  );
}
