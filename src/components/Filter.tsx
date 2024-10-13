import { useState } from "react";
import { FilterButton } from "./Buttons";
import { useEffect } from "react";
import { Opacity } from "@mui/icons-material";
import { colors, rgbToHex } from "@mui/material";

export interface FilterButtonData {
    label: string;
    key: string;
    filterEnabled: boolean;
    filterFunction: () => void;     // Function takes all the stations and returns the filtered object
}
interface FilterButtonProps {
    filterButtonData: FilterButtonData[];
    stations: any[];
}

export const Filter = ({ filterButtonData, stations }: FilterButtonProps) => {
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
                            backgroundColor: buttonData.filterEnabled ? 'white' : 'black',
                            color: buttonData.filterEnabled ? 'black' : 'white',
                            opacity: buttonData.filterEnabled ? 1 : 0.75,
                            fontWeight: buttonData.filterEnabled ? 'bold' : 'normal',
                        }}
                        onClick={() => {
                            buttonData.filterFunction()
                        }}
                    />
                );
            }
        )}
        </div> 
    )
}