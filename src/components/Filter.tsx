import { FilterButton } from "./Buttons";

export interface FilterButtonData {
    label: string;
    shouldFilter: boolean;
    filterFunction: (x: object) => object;     // Function takes all the stations and returns the filtered object
}
interface FilterButtonProps {
    filterButtonData: FilterButtonData[];
    filterCallback: (x: any[]) => void;      // Function takes all the stations and returns the filtered object
}

export const Filter = ({ filterButtonData, filterCallback }: FilterButtonProps) => {
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
            <FilterButton label="On Campus" onClick={() => {}}></FilterButton>
            <FilterButton label="Off Campus" onClick={() => {}}></FilterButton>
            <FilterButton label="Available Bikes" onClick={() => {}}></FilterButton>
        </div> 
    )
}