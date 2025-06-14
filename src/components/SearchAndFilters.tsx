import React, { useState } from 'react';

const SearchAndFilters = ({ onSearch, onTagFilter, tags, searchValue }) => {
    const [search, setSearch] = useState(searchValue || '');

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        onSearch(e.target.value);
    };

    const clearSearch = () => {
        setSearch('');
        onSearch('');
    };

    return (
        <div className="search-and-filters">
            {/* Search input with 'x' to clear */}
            <div style={{ position: 'relative', display: 'inline-block' }}>
                <input
                    type="text"
                    value={search}
                    onChange={handleSearchChange}
                    placeholder="Search..."
                    style={{ paddingRight: '20px' }}
                />
                {search && (
                    <span
                        onClick={clearSearch}
                        style={{
                            position: 'absolute',
                            right: 6,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            cursor: 'pointer',
                            fontSize: '14px',
                            color: '#888',
                            userSelect: 'none'
                        }}
                        aria-label="Clear search"
                    >
                        ×
                    </span>
                )}
            </div>
            {/* Only Tag filter remains */}
            <select onChange={e => onTagFilter(e.target.value)}>
                <option value="">All Tags</option>
                {tags.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                ))}
            </select>
            {/* Removed headers/titles and clear filter button */}
        </div>
    );
};

export default SearchAndFilters;