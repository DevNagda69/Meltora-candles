import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiSearch, FiMenu, FiX } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import './Header.css';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { cartItems } = useCart();
    const location = useLocation();

    const cartItemCount = cartItems?.reduce((total, item) => total + item.quantity, 0) || 0;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/shop', label: 'Shop' },
        { path: '/about', label: 'About' },
        { path: '/contact', label: 'Contact' },
    ];

    return (
        <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
            <div className="container">
                <div className="header-content">
                    {/* Logo */}
                    <Link to="/" className="logo">
                        <img src="/logo.png" alt="Meltora Candles" className="logo-image" />
                        <span className="logo-text">Meltora Candles</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="nav-desktop hidden-mobile">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="header-actions">
                        <button className="icon-button" aria-label="Search">
                            <FiSearch />
                        </button>

                        <Link to="/checkout" className="icon-button cart-button" aria-label="Shopping Cart">
                            <FiShoppingCart />
                            {cartItemCount > 0 && (
                                <span className="cart-badge">{cartItemCount}</span>
                            )}
                        </Link>

                        <button className="icon-button" aria-label="User Account">
                            <FiUser />
                        </button>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="icon-button mobile-menu-toggle hidden-desktop"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle Menu"
                        >
                            {mobileMenuOpen ? <FiX /> : <FiMenu />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <nav className="nav-mobile hidden-desktop">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`nav-link-mobile ${location.pathname === link.path ? 'active' : ''}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                )}
            </div>
        </header>
    );
};

export default Header;
