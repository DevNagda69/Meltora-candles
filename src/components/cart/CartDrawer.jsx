import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiX, FiMinus, FiPlus, FiTrash2, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import Button from '../common/Button';
import './CartDrawer.css';

const CartDrawer = () => {
    const {
        cartItems,
        isCartOpen,
        setIsCartOpen,
        removeFromCart,
        updateQuantity,
        getCartTotal
    } = useCart();

    const navigate = useNavigate();
    const drawerRef = useRef(null);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (drawerRef.current && !drawerRef.current.contains(event.target)) {
                setIsCartOpen(false);
            }
        };

        if (isCartOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            // Prevent body scroll when open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'unset';
        };
    }, [isCartOpen, setIsCartOpen]);

    // Calculate generic total
    const total = getCartTotal();
    const shippingThreshold = 999;
    const remainingForFreeShipping = shippingThreshold - total;

    const handleCheckout = () => {
        setIsCartOpen(false);
        navigate('/checkout');
    };

    return (
        <>
            <div className={`cart-overlay ${isCartOpen ? 'open' : ''}`}></div>

            <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`} ref={drawerRef}>
                <div className="cart-header">
                    <div className="flex items-center gap-2">
                        <FiShoppingBag className="text-xl" />
                        <h3>Your Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})</h3>
                    </div>
                    <button className="close-cart-btn" onClick={() => setIsCartOpen(false)}>
                        <FiX />
                    </button>
                </div>

                {/* Free Shipping Progress */}
                <div className="shipping-progress">
                    {remainingForFreeShipping > 0 ? (
                        <p className="text-sm mb-2">
                            Add <strong>₹{remainingForFreeShipping}</strong> more for <span className="text-success">FREE Shipping</span>
                        </p>
                    ) : (
                        <p className="text-sm mb-2 text-success">
                            You've unlocked <strong>FREE Shipping!</strong>
                        </p>
                    )}
                    <div className="progress-bar-bg">
                        <div
                            className="progress-bar-fill"
                            style={{ width: `${Math.min((total / shippingThreshold) * 100, 100)}%` }}
                        ></div>
                    </div>
                </div>

                <div className="cart-items-container">
                    {cartItems.length === 0 ? (
                        <div className="empty-cart">
                            <div className="empty-cart-icon">
                                <FiShoppingBag />
                            </div>
                            <p>Your cart is empty</p>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setIsCartOpen(false);
                                    navigate('/shop');
                                }}
                            >
                                Start Shopping
                            </Button>
                        </div>
                    ) : (
                        <div className="cart-items-list">
                            {cartItems.map((item) => (
                                <div key={item.uniqueId} className="cart-item">
                                    <div className="item-image">
                                        <img src={item.image} alt={item.name} />
                                    </div>

                                    <div className="item-details">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="item-name">{item.name}</h4>
                                                <div className="item-meta">
                                                    {item.selectedVariation && (
                                                        <span>{item.selectedVariation.size}</span>
                                                    )}
                                                    {/* Fragrance is mostly inherent to product name but if variation exists show it */}
                                                    {item.selectedVariation && item.selectedVariation.fragrance !== item.name && (
                                                        <span> • {item.selectedVariation.fragrance}</span>
                                                    )}
                                                </div>
                                            </div>
                                            <button
                                                className="remove-item-btn"
                                                onClick={() => removeFromCart(item.uniqueId)}
                                            >
                                                <FiTrash2 />
                                            </button>
                                        </div>

                                        <div className="flex justify-between items-center mt-3">
                                            <div className="item-quantity">
                                                <button
                                                    onClick={() => updateQuantity(item.uniqueId, item.quantity - 1)}
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <FiMinus />
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.uniqueId, item.quantity + 1)}
                                                >
                                                    <FiPlus />
                                                </button>
                                            </div>
                                            <div className="item-price">
                                                ₹{(item.selectedVariation?.price || item.price) * item.quantity}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="cart-footer">
                        <div className="cart-total-row">
                            <span>Subtotal</span>
                            <span className="total-amount">₹{total}</span>
                        </div>
                        <p className="tax-note">Shipping & taxes calculated at checkout</p>

                        <Button
                            variant="primary"
                            className="w-full"
                            onClick={handleCheckout}
                        >
                            Checkout • ₹{total}
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartDrawer;
