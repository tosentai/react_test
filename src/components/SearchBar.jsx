import React from "react";

function SearchBar({ searchTerm, onSearchChange }) {
    return (
        <div className="mb-4">
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full px-3 py-2 border border-black"
            />
        </div>
    );
}

export default SearchBar;
