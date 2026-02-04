import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import './Hero.css';

const Hero = () => {
    const navigate = useNavigate();

    return (
        <section className="hero">
            <div className="hero-background">
                <div className="overlay"></div>
                {/* Placeholder for hero image - usually a background image in CSS */}
            </div>

            <div className="hero-content container text-center">
                <span className="hero-subtitle fade-in-up stagger-1">Handcrafted with Love</span>
                <h1 className="hero-title fade-in-up stagger-2">
                    Luxury Scents for<br />Every Moment
                </h1>
                <p className="hero-description fade-in-up stagger-3">
                    Discover our collection of premium, hand-poured soy wax candles designed to bring warmth and elegance to your space.
                </p>
                <div className="hero-actions fade-in-up stagger-4">
                    <Button
                        variant="primary"
                        size="large"
                        onClick={() => navigate('/shop')}
                    >
                        Shop Collection
                    </Button>
                    <Button
                        variant="secondary"
                        size="large"
                        onClick={() => navigate('/about')}
                        className="btn-outline-light"
                    >
                        Our Story
                    </Button>
                </div>
            </div>

            <div className="scroll-indicator fade-in stagger-5">
                <span className="mouse">
                    <span className="wheel"></span>
                </span>
            </div>
        </section>
    );
};

export default Hero;
