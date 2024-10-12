

interface FilterButtonProps {
    label: string;
    onClick: () => void;
}

export const FilterButton = ({label, onClick}: FilterButtonProps) => {    // Rounded rectangle buttons on right side of page to 
    // filter bcycle stops by on/off campus, stations with available bikes, 
    return (
        <div style={{ width: 175, margin: '7.5px 0px 7.5px 0px', fontSize: 18 }}>
            <button onClick={onClick} style={{  borderRadius: 50, padding: 17.5, width: '100%', backgroundColor: 'black' }}>{label}</button>
        </div>
    )
} 