import './VariationSelector.css';

const VariationSelector = ({
    variations,
    selections,
    onSelectionChange
}) => {
    if (!variations) return null;

    return (
        <div className="variations-container">
            {/* Size Selector */}
            {variations.sizes && (
                <div className="variation-group">
                    <label className="variation-label">Size</label>
                    <div className="options-grid">
                        {variations.sizes.map((size) => (
                            <button
                                key={size.value}
                                className={`option-btn ${selections.size === size.value ? 'selected' : ''}`}
                                onClick={() => onSelectionChange('size', size.value)}
                            >
                                <span className="option-text">{size.label}</span>
                                {size.priceAdjustment !== 0 && (
                                    <span className="option-price">
                                        {size.priceAdjustment > 0 ? '+' : ''}₹{size.priceAdjustment}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Fragrance Selector - Optional, mostly for multi-scent listings */}
            {variations.fragrances && (
                <div className="variation-group">
                    <label className="variation-label">Fragrance Note</label>
                    <div className="options-list">
                        {variations.fragrances.map((scent) => (
                            <button
                                key={scent}
                                className={`text-option-btn ${selections.fragrance === scent ? 'selected' : ''}`}
                                onClick={() => onSelectionChange('fragrance', scent)}
                            >
                                {scent}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default VariationSelector;
