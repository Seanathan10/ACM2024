import MapComponent from "./Map";

import { useEffect, useState } from "react";
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
      {/* <Outlet />; */}
      <MapComponent></MapComponent>
    </>
  );
}
