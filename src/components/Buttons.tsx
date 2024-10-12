import * as React from 'react';

interface FilterButtonProps {
    label: string;
    onClick: () => void;
}

export const FilterButton = ({label, onClick}: FilterButtonProps) => {    // Rounded rectangle buttons on right side of page to 
    // filter bcycle stops by on/off campus, stations with available bikes, 
    return (
        <div style={{ width: 120, fontSize: 15, borderRadius: 5, backgroundColor: 'gray' }}>
            <button onClick={onClick}>{label}</button>
        </div>
    )
} 