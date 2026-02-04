import { useState, useRef, useEffect } from 'react';
import { FiChevronDown, FiCheck } from 'react-icons/fi';
import './SortDropdown.css';

const SortDropdown = ({ currentSort, onSortChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const sortOptions = [
        { value: 'popularity', label: 'Most Popular' },
        { value: 'newest', label: 'New Arrivals' },
        { value: 'price-low', label: 'Price: Low to High' },
        { value: 'price-high', label: 'Price: High to Low' },
        { value: 'rating', label: 'Highest Rated' }
    ];

    const toggleDropdown = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (value) => {
        onSortChange(value);
        setIsOpen(false);
    };

    const currentLabel = sortOptions.find(opt => opt.value === currentSort)?.label || 'Sort By';

    return (
        <div className="sort-dropdown" ref={dropdownRef}>
            <button
                className={`sort-trigger ${isOpen ? 'active' : ''}`}
                onClick={toggleDropdown}
            >
                <span className="sort-label">Sort by:</span>
                <span className="sort-value">{currentLabel}</span>
                <FiChevronDown className={`sort-icon ${isOpen ? 'rotate' : ''}`} />
            </button>

            {isOpen && (
                <div className="sort-menu fade-in">
                    {sortOptions.map(option => (
                        <button
                            key={option.value}
                            className={`sort-option ${currentSort === option.value ? 'selected' : ''}`}
                            onClick={() => handleSelect(option.value)}
                        >
                            {option.label}
                            {currentSort === option.value && <FiCheck />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SortDropdown;
