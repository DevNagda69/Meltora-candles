import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../services/firebase';
import Button from '../components/common/Button';
import toast from 'react-hot-toast';
import './Checkout.css';

const Checkout = () => {
    const { cartItems, getCartTotal } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        notes: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        if (cartItems.length === 0) {
            toast.error('Your cart is empty');
            return;
        }

        setLoading(true);
        try {
            const orderData = {
                items: cartItems.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.selectedVariation?.price || item.price,
                    quantity: item.quantity,
                    size: item.selectedVariation?.size || ''
                })),
                shipping: formData,
                subtotal,
                shippingFee: shipping,
                total,
                status: 'Pending',
                createdAt: serverTimestamp()
            };

            await addDoc(collection(db, 'orders'), orderData);

            toast.success('Order placed successfully!');
            // clearCart(); // Should be implemented in CartContext
            navigate('/');
        } catch (error) {
            console.error('Error placing order:', error);
            toast.error('Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const subtotal = getCartTotal();
    const shipping = subtotal > 999 ? 0 : 99;
    const total = subtotal + shipping;

    if (cartItems.length === 0) {
        return (
            <div className="section container text-center">
                <h2>Your cart is empty</h2>
                <Button variant="primary" onClick={() => navigate('/shop')}>
                    Return to Shop
                </Button>
            </div>
        );
    }

    return (
        <div className="page-checkout section-sm">
            <div className="container">
                <h1 className="checkout-title">Checkout</h1>

                <div className="checkout-layout">
                    {/* Left Column - Shipping Details */}
                    <div className="checkout-form-wrapper">
                        <h3 className="section-header">Shipping Information</h3>
                        <form id="checkout-form" onSubmit={handlePlaceOrder}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Street, locality, house number"
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Pincode</label>
                                    <input
                                        type="text"
                                        name="pincode"
                                        value={formData.pincode}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>State</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Order Notes (Optional)</label>
                                <textarea
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    rows="3"
                                ></textarea>
                            </div>
                        </form>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="checkout-summary-wrapper">
                        <div className="checkout-summary card">
                            <h3 className="summary-header">Order Summary</h3>

                            <div className="summary-items">
                                {cartItems.map(item => (
                                    <div key={item.uniqueId} className="summary-item">
                                        <div className="summary-item-info">
                                            <div className="summary-img">
                                                <img src={item.image} alt={item.name} />
                                                <span className="qty-badge">{item.quantity}</span>
                                            </div>
                                            <div>
                                                <h4>{item.name}</h4>
                                                <span className="text-xs text-muted">
                                                    {item.selectedVariation?.size || ''}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="summary-item-price">
                                            ₹{(item.selectedVariation?.price || item.price) * item.quantity}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="summary-costs">
                                <div className="cost-row">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal}</span>
                                </div>
                                <div className="cost-row">
                                    <span>Shipping</span>
                                    <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                                </div>
                                <div className="cost-row total">
                                    <span>Total</span>
                                    <span>₹{total}</span>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                form="checkout-form"
                                variant="primary"
                                loading={loading}
                                className="w-full mt-4"
                            >
                                Place Order
                            </Button>

                            <p className="secure-notice text-center mt-4">
                                🔒 Secure Checkout with Razorpay
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
