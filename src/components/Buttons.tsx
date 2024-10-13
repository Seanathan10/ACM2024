

interface FilterButtonProps {
    label: string;
    style?: object;
    onClick: () => void;
}

export const FilterButton = ({label, style = {}, onClick}: FilterButtonProps) => {    // Rounded rectangle buttons on right side of page to 
    // filter bcycle stops by on/off campus, stations with available bikes, 
    return (
        <div style={{width: '90%', minWidth: 185, margin: '7.5px 0px 7.5px 0px', fontSize: 18 }}>
            <button onClick={onClick} style={{ ...style, borderRadius: 50, padding: 17.5, width: '100%' }}>{label}</button>
        </div>
    )
} 