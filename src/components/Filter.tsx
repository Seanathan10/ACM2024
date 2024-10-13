import { useState } from "react";
import { FilterButton } from "./Buttons";
import { useEffect } from "react";
import { Opacity } from "@mui/icons-material";
import { colors, rgbToHex } from "@mui/material";

export interface FilterButtonData {
    label: string;
    key: string;
    filterEnabled: boolean;
    filterFunction: (x: object) => object[];     // Function takes all the stations and returns the filtered object
}
interface FilterButtonProps {
    filterButtonData: FilterButtonData[];
    stations: any[];
    filterCallback: (x: Set<string>) => void;      // Function takes all the stations and returns the filtered object
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
            backgroundColor: 'rgba(31, 31, 31, 0.85)',
            width: '15%',
            minWidth: '200px',
            padding: 10,
            borderRadius: '10px',
            alignItems: 'center',
            // color: 'white',
            // filter: 'blur(1px)',
            // opacity: 0.85,
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
                        style={{
                            backgroundColor: filterButtonToggles[buttonData.key] ? 'white' : 'black',
                            color: filterButtonToggles[buttonData.key] ? 'black' : 'white',
                            opacity: filterButtonToggles[buttonData.key] ? 1 : 0.75,
                            fontWeight: filterButtonToggles[buttonData.key] ? 'bold' : 'normal',

                        }}
                        onClick={() => {
                            setFilterButtonToggles((prevToggles) => {
                                const newToggles = { ...prevToggles };
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
                                // Return a list of station ids that should be displayed based on the filters

                                let stationsToDisplay = new Set<string>(filteredStations.map((station) => station['station_id']));  // Set of station ids to display for O(1) lookup

                                console.log('stationsToDisplay', stationsToDisplay);

                                filterCallback(stationsToDisplay);
                                return newToggles;
                        })}}
                    />
                );
            }
        )}
        </div> 
    )
}