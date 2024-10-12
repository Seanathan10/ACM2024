

interface FilterButtonProps {
    label: string;
    onClick: () => void;
}

export const FilterButton = ({label, onClick}: FilterButtonProps) => {    // Rounded rectangle buttons on right side of page to 
    // filter bcycle stops by on/off campus, stations with available bikes, 
    return (
        <div>
            <button style={{ borderRadius: 25, padding: 10, backgroundColor: 'gray', position: 'fixed', top: '10%', right: '5%' }} onClick={onClick}>{label}</button>
        </div>
    )
} 