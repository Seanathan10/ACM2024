import { useState } from "react";
import { FilterButton } from "./Buttons";
import { useEffect } from "react";

export interface FilterButtonData {
    label: string;
    key: string;
    filterEnabled: boolean;
    filterFunction: (x: object) => object[];     // Function takes all the stations and returns the filtered object
}
interface FilterButtonProps {
    filterButtonData: FilterButtonData[];
    stations: any[];
    filterCallback: (x: object[]) => void;      // Function takes all the stations and returns the filtered object
}

export const Filter = ({ filterButtonData, filterCallback, stations }: FilterButtonProps) => {
    const [filterButtonToggles, setFilterButtonToggles] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const initialToggles = filterButtonData.reduce((acc, buttonData) => {
            acc[buttonData.key] = buttonData.filterEnabled;
            return acc;
        }, {} as Record<string, boolean>);
        setFilterButtonToggles(initialToggles);
        console.log(filterButtonToggles);
    }, []);

    return (
        <div style={{
            position: 'fixed',
            top: '12.5%',
            right: '1%',
            display: 'flex',
            flexDirection: 'column',
            // justifyItems: 'center',
            // justifyContent: 'center',
            backgroundColor: 'gray',
            width: '15%',
            minWidth: '200px',
            padding: 10,
            borderRadius: '10px',
            alignItems: 'center',
            // color: 'white',
            // filter: 'blur(1px)',
            opacity: 0.85,
            fontWeight: 'bold',
            fontSize: '20px',
            // boxShadow: '0px 0px 5px .1px black',

        }}>
            <div style={{
                filter: 'blur(5px)',
                width: '100%',
                height: '100%',
                backgroundColor: '',
            }} />
            <label style={{
                backgroundColor: 'gray',
                padding: '5px',
                borderRadius: '25px',
                color: 'black',
                fontWeight: 'bold'
            }}>Filter Stations</label>
            {filterButtonData.map((buttonData) => {
                return (
                    <FilterButton
                        key={buttonData.key}
                        label={buttonData.label}
                        onClick={() => {
                            const newToggles = { ...filterButtonToggles };
                            console.log('newToggles', newToggles);
                            newToggles[buttonData.key] = !newToggles[buttonData.key];
                            console.log('newToggles1', newToggles);

                            let filteredStations: object[] = [] // For each toggle that is true, filter the stations by all the filter functions in
                            let temp = stations;
                            
                            filterButtonData.forEach((button) => {
                                if (newToggles[button.key]) {
                                    // If the button is toggled on, apply the filter
                                    temp = button.filterFunction(temp); // I am stupid
                                    
                                    console.log('stations filterde', temp);
                                    filteredStations = filteredStations.concat(temp);
                                }
                            })
                            // Return a mapping of unique station ids to boolean values whether they are shown or not 
                            let stationsToShow: Record<string, boolean> = filteredStations.map((station) => {
                                station['data']['stations']['station_id'] = true;
                            }
                            )
                            console.log('stationsToShow', stationsToShow);

                            filterCallback(filteredStations);
                        }}
                    />
                );
            }
        )}
        </div> 
    )
}