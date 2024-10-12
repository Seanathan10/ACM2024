import MapComponent from "./Map";

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

      console.log(statusData);
      console.log('a', informationData);
    }
    fetchData();
  }, [informationData, statusData]);
  return (
    <>
      Hello
      <MapComponent></MapComponent>
    </>
  );
}
