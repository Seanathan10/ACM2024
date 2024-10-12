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
  }, []);

  // Use another useEffect to log state changes
  
  return (
    <>
      Hello
      <MapComponent information = {informationData} status={statusData}></MapComponent>
    </>
  );
}
