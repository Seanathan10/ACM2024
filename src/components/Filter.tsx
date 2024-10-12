import { FilterButton } from "./Buttons";

interface FilterButtonProps {
    label: string;
}

export const Filter = ({ label }: FilterButtonProps) => {
    return (
        <div style={{
            position: 'fixed',
            top: '5%',
            right: '5%',
            display: 'flex',
            flexDirection: 'column',
            // justifyItems: 'center',
            // justifyContent: 'center',
            backgroundColor: 'gray',
            width: '15vw',
            padding: 0,
            borderRadius: '10px',
            alignItems: 'center',
            // color: 'white',
            // opacity: 0.8,
            // fontWeight: 'bold'
        }}>
            {/* <label style={{
                backgroundColor: 'gray',
                padding: '5px',
                borderRadius: '25px',
                color: 'black',
                fontWeight: 'bold'
            }}>Filter Stations</label> */}
            <FilterButton label="On Campus" onClick={() => {}}></FilterButton>
            <FilterButton label="Off Campus" onClick={() => {}}></FilterButton>
            <FilterButton label="Available Bikes" onClick={() => {}}></FilterButton>
        </div>
    )
}