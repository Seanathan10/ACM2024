
export const FilterButton = ({ onClick, children }) => {    // Rounded rectangle buttons on right side of page to 
                                                            // filter bcycle stops by on/off campus, stations with available bikes, 
    return (
        <button onClick={onClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {children}
        </button>
    )
} 