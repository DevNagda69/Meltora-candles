import { useState } from 'react';
import { FiX, FiMinus, FiPlus, FiCheck } from 'react-icons/fi';
import Button from '../common/Button';
import './FilterSidebar.css';

const FilterSidebar = ({ isOpen, onClose, filters, setFilters }) => {
    const [expandedSections, setExpandedSections] = useState({
        collection: true,
        scent: true,
        price: true,
        size: false,
        availability: false
    });

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const handleCheckboxChange = (category, value) => {
        setFilters(prev => {
            const currentValues = prev[category] || [];
            const newValues = currentValues.includes(value)
                ? currentValues.filter(item => item !== value)
                : [...currentValues, value];

            return {
                ...prev,
                [category]: newValues
            };
        });
    };

    const handlePriceChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            priceRange: {
                ...prev.priceRange,
                [name]: parseInt(value) || 0
            }
        }));
    };

    // Filter Options
    const collections = ['Signature', 'Seasonal', 'Limited Edition', 'Gift Sets'];
    const scents = ['Floral', 'Woody', 'Fresh', 'Sweet', 'Citrus', 'Spicy'];
    const sizes = ['Small (100g)', 'Medium (200g)', 'Large (400g)'];
    const availability = ['In Stock', 'Pre-Order'];

    return (
        <>
            {/* Overlay for mobile */}
            <div
                className={`filter-overlay ${isOpen ? 'open' : ''}`}
                onClick={onClose}
            ></div>

            <aside className={`filter-sidebar ${isOpen ? 'open' : ''}`}>
                <div className="filter-header">
                    <h3>Filters</h3>
                    <button className="close-btn hidden-desktop" onClick={onClose}>
                        <FiX />
                    </button>
                </div>

                <div className="filter-content">
                    {/* Collections */}
                    <div className="filter-section">
                        <button
                            className="filter-toggle"
                            onClick={() => toggleSection('collection')}
                        >
                            <span>Collection</span>
                            {expandedSections.collection ? <FiMinus /> : <FiPlus />}
                        </button>

                        {expandedSections.collection && (
                            <div className="filter-options">
                                {collections.map(option => (
                                    <label key={option} className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={filters.collection?.includes(option) || false}
                                            onChange={() => handleCheckboxChange('collection', option)}
                                        />
                                        <span className="checkbox-custom"><FiCheck /></span>
                                        <span className="checkbox-text">{option}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Scent */}
                    <div className="filter-section">
                        <button
                            className="filter-toggle"
                            onClick={() => toggleSection('scent')}
                        >
                            <span>Scent Profile</span>
                            {expandedSections.scent ? <FiMinus /> : <FiPlus />}
                        </button>

                        {expandedSections.scent && (
                            <div className="filter-options">
                                {scents.map(option => (
                                    <label key={option} className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={filters.scent?.includes(option) || false}
                                            onChange={() => handleCheckboxChange('scent', option)}
                                        />
                                        <span className="checkbox-custom"><FiCheck /></span>
                                        <span className="checkbox-text">{option}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Price Range */}
                    <div className="filter-section">
                        <button
                            className="filter-toggle"
                            onClick={() => toggleSection('price')}
                        >
                            <span>Price Range</span>
                            {expandedSections.price ? <FiMinus /> : <FiPlus />}
                        </button>

                        {expandedSections.price && (
                            <div className="filter-options">
                                <div className="price-inputs">
                                    <div className="price-input-group">
                                        <span className="currency-symbol">₹</span>
                                        <input
                                            type="number"
                                            name="min"
                                            placeholder="Min"
                                            value={filters.priceRange?.min || ''}
                                            onChange={handlePriceChange}
                                        />
                                    </div>
                                    <span className="price-separator">-</span>
                                    <div className="price-input-group">
                                        <span className="currency-symbol">₹</span>
                                        <input
                                            type="number"
                                            name="max"
                                            placeholder="Max"
                                            value={filters.priceRange?.max || ''}
                                            onChange={handlePriceChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Size */}
                    <div className="filter-section">
                        <button
                            className="filter-toggle"
                            onClick={() => toggleSection('size')}
                        >
                            <span>Size</span>
                            {expandedSections.size ? <FiMinus /> : <FiPlus />}
                        </button>

                        {expandedSections.size && (
                            <div className="filter-options">
                                {sizes.map(option => (
                                    <label key={option} className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={filters.size?.includes(option) || false}
                                            onChange={() => handleCheckboxChange('size', option)}
                                        />
                                        <span className="checkbox-custom"><FiCheck /></span>
                                        <span className="checkbox-text">{option}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="filter-footer">
                    <Button
                        variant="secondary"
                        size="small"
                        onClick={() => setFilters({})}
                        className="w-full mb-2"
                    >
                        Clear All
                    </Button>
                    <Button
                        variant="primary"
                        size="small"
                        onClick={onClose}
                        className="w-full hidden-desktop"
                    >
                        Apply Filters
                    </Button>
                </div>
            </aside>
        </>
    );
};

export default FilterSidebar;
