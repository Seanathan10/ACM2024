import MapComponent from "./Map";
import { HistoricalChart } from "./components/Chart";


import { useEffect, useState } from "react";
import { getBcycleInformationJSON, getBcycleStatusJSON } from "./api/BCycle";

export default function App() {
  const [statusData, setStatusData] = useState({});
  const [informationData, setInformationData] = useState({});
  
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
      {/* <Outlet />; */}
      <MapComponent information = {informationData} status={statusData}></MapComponent>
      <HistoricalChart stationID="bcycle_santacruz_7434"/>
    </>
  );
}
