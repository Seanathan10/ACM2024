import React from "react";
// import { Map, Marker } from "pigeon-maps";

import MapComponent from "./Map";

import { useEffect, useState } from "react";
import { FilterButton } from "./components/Buttons";
import { getBcycleInformationJSON, getBcycleStatusJSON } from "./api/BCycle";
// import { getBcycleInformationJSON, getBcycleStatusJSON } from "api/BCycle";

// export function Layout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <head>
//         <meta charSet="utf-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//       </head>
//       <body>
//         <Map
//           height={1500}
//           defaultCenter={[36.995544, -122.06037]}
//           defaultZoom={15}
//         >
//           <Marker width={50} anchor={[50.879, 4.6997]} />
//         </Map>
//         <Scripts />
//       </body>
//     </html>
//   );
// }

export default function App() {
  const [statusData, setStatusData] = useState({});
  const [informationData, setInformationData] = useState({});
  
  useEffect(() => {
    async function fetchData() {
      const status = await getBcycleStatusJSON();
      const information = await getBcycleInformationJSON();
      console.log(status, information);
      setStatusData(status);
      setInformationData(information['data']);


    }
    fetchData();
  }, []);
  return (
    <>
      <div style={{backgroundColor: 'red', display: 'flex', width: 500, height: 50, justifyContent: 'center'}}>
        <div style={{width: 50, height: 50, backgroundColor: 'green', justifySelf: 'center'}}/>
        {/* <button style={{cent }}>ahwnisds</button> */}
      </div>
      <MapComponent></MapComponent>
    </>
  );
}
