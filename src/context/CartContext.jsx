import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('meltora_cart');
        if (savedCart) {
            try {
                setCartItems(JSON.parse(savedCart));
            } catch (error) {
                console.error('Failed to parse cart data:', error);
            }
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('meltora_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, quantity = 1, variation = null) => {
        setCartItems(prevItems => {
            // Create a unique ID for the cart item based on product ID and variation attributes
            const variationId = variation ? `${variation.size}-${variation.fragrance}` : 'standard';
            const uniqueId = `${product.id}-${variationId}`;

            const existingItemIndex = prevItems.findIndex(item => item.uniqueId === uniqueId);

            if (existingItemIndex > -1) {
                // Item exists, update quantity
                const newItems = [...prevItems];
                newItems[existingItemIndex].quantity += quantity;
                toast.success(`Updated quantity for ${product.name}`);
                return newItems;
            } else {
                // New item
                toast.success(`Added ${product.name} to cart`);
                return [...prevItems, {
                    ...product,
                    uniqueId,
                    quantity,
                    selectedVariation: variation
                }];
            }
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (uniqueId) => {
        setCartItems(prevItems => prevItems.filter(item => item.uniqueId !== uniqueId));
        toast.success('Item removed from cart');
    };

    const updateQuantity = (uniqueId, newQuantity) => {
        if (newQuantity < 1) return;

        setCartItems(prevItems =>
            prevItems.map(item =>
                item.uniqueId === uniqueId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('meltora_cart');
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => {
            const price = item.selectedVariation ? item.selectedVariation.price : item.price;
            return total + (price * item.quantity);
        }, 0);
    };

    const value = {
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
