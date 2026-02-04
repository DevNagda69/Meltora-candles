import { useState } from 'react';
import { FiMinus, FiPlus, FiHeart, FiShare2 } from 'react-icons/fi';
import Button from '../common/Button';
import { useCart } from '../../context/CartContext';
import './AddToCart.css';

const AddToCart = ({ product, selections, currentPrice }) => {
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const [loading, setLoading] = useState(false);

    const handleDecrease = () => {
        if (quantity > 1) setQuantity(prev => prev - 1);
    };

    const handleIncrease = () => {
        // Check stock if available
        if (product.stock && quantity >= product.stock) return;
        setQuantity(prev => prev + 1);
    };

    const handleAddToCart = () => {
        setLoading(true);
        // Simulate slight delay for ux
        setTimeout(() => {
            addToCart(product, quantity, { ...selections, price: currentPrice });
            setLoading(false);
        }, 500);
    };

    const handleBuyNow = () => {
        // Add to cart and redirect to checkout
        addToCart(product, quantity, { ...selections, price: currentPrice });
        // navigate('/checkout'); // In real implementation
    };

    return (
        <div className="add-to-cart-container">
            <div className="quantity-wrapper">
                <label>Quantity</label>
                <div className="quantity-selector">
                    <button
                        className="qty-btn"
                        onClick={handleDecrease}
                        disabled={quantity <= 1}
                    >
                        <FiMinus />
                    </button>
                    <span className="qty-value">{quantity}</span>
                    <button
                        className="qty-btn"
                        onClick={handleIncrease}
                        disabled={product.stock && quantity >= product.stock}
                    >
                        <FiPlus />
                    </button>
                </div>
            </div>

            <div className="actions-wrapper">
                <div className="main-actions">
                    <Button
                        variant="primary"
                        className="flex-grow"
                        onClick={handleAddToCart}
                        loading={loading}
                        disabled={product.stock === 0}
                    >
                        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </Button>
                    <Button
                        variant="dark"
                        className="flex-grow"
                        onClick={handleBuyNow}
                        disabled={product.stock === 0}
                    >
                        Buy Now
                    </Button>
                </div>

                <div className="secondary-actions">
                    <button className="icon-action-btn">
                        <FiHeart /> Add to Wishlist
                    </button>
                    <button className="icon-action-btn">
                        <FiShare2 /> Share
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddToCart;
