import { useNavigate } from 'react-router-dom';
import { FiShoppingBag, FiHeart, FiEye } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const { addToCart } = useCart();

    // Destructure product with safe defaults
    const {
        id,
        name,
        price = 0,
        image = 'https://via.placeholder.com/300x400?text=Candle',
        category,
        isNew,
        isSale,
        salePrice
    } = product || {};

    const handleAddToCart = (e) => {
        e.stopPropagation();
        addToCart(product);
    };

    const handleQuickView = (e) => {
        e.stopPropagation();
        // In a real app, this would open a modal
        navigate(`/product/${id}`);
    };

    return (
        <div className="product-card group" onClick={() => navigate(`/product/${id}`)}>
            <div className="product-image-container">
                <img
                    src={image}
                    alt={name}
                    className="product-image"
                    loading="lazy"
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x400?text=Premium+Candle';
                        e.target.onerror = null;
                    }}
                />

                {/* Badges */}
                <div className="product-badges">
                    {isNew && <span className="badge badge-new">New</span>}
                    {isSale && <span className="badge badge-sale">Sale</span>}
                </div>

                {/* Overlay Actions */}
                <div className="product-actions-overlay">
                    <button
                        className="action-btn"
                        onClick={handleAddToCart}
                        aria-label="Add to Cart"
                    >
                        <FiShoppingBag />
                    </button>
                    <button
                        className="action-btn"
                        onClick={handleQuickView}
                        aria-label="Quick View"
                    >
                        <FiEye />
                    </button>
                    <button
                        className="action-btn"
                        onClick={(e) => {
                            e.stopPropagation();
                            // Add to wishlist logic
                        }}
                        aria-label="Add to Wishlist"
                    >
                        <FiHeart />
                    </button>
                </div>
            </div>

            <div className="product-info">
                <span className="product-category">{category}</span>
                <h3 className="product-name">{name}</h3>
                <div className="product-price">
                    {isSale ? (
                        <>
                            <span className="price-original">₹{price}</span>
                            <span className="price-sale">₹{salePrice}</span>
                        </>
                    ) : (
                        <span className="price-regular">₹{price}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
