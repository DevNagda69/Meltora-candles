import { Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiMail, FiPhone } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    {/* Brand Section */}
                    <div className="footer-brand">
                        <Link to="/" className="footer-logo">
                            Meltora Candles
                        </Link>
                        <p className="footer-tagline">
                            Handcrafted luxury scented candles made with love. Bring warmth and elegance to your home.
                        </p>
                        <div className="social-links">
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <FiInstagram />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <FiFacebook />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-links">
                        <h3>Shop</h3>
                        <ul>
                            <li><Link to="/shop">All Candles</Link></li>
                            <li><Link to="/shop?category=scented">Scented Candles</Link></li>
                            <li><Link to="/shop?category=decorative">Decorative Candles</Link></li>
                            <li><Link to="/shop?category=gift-sets">Gift Sets</Link></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div className="footer-links">
                        <h3>Help</h3>
                        <ul>
                            <li><Link to="/about">Our Story</Link></li>
                            <li><Link to="/contact">Contact Us</Link></li>
                            <li><Link to="/faq">FAQs</Link></li>
                            <li><Link to="/shipping">Shipping & Returns</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="footer-contact">
                        <h3>Contact Us</h3>
                        <ul>
                            <li>
                                <FiMail />
                                <a href="mailto:hello@meltoracandles.com">hello@meltoracandles.com</a>
                            </li>
                            <li>
                                <FiPhone />
                                <a href="tel:+919876543210">+91 98765 43210</a>
                            </li>
                            <li>
                                <p>123 Candle Lane, Creative City,<br />Mumbai, Maharashtra 400001</p>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="copyright">
                        &copy; {currentYear} Meltora Candles. All rights reserved.
                    </div>
                    <div className="legal-links">
                        <Link to="/privacy">Privacy Policy</Link>
                        <Link to="/terms">Terms & Conditions</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
