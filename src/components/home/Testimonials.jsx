import { useState, useEffect } from 'react';
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './Testimonials.css';

const Testimonials = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const testimonials = [
        {
            id: 1,
            name: 'Priya Sharma',
            text: "The Vanilla Bean candle is absolutely divine! It burns evenly and fills the whole room with a warm, comforting scent. Can't wait to try more.",
            rating: 5,
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop'
        },
        {
            id: 2,
            name: 'Aditya Patel',
            text: "Bought the Gift Set for my wife's birthday and she loved it. The packaging is so luxurious and premium. Highly recommended!",
            rating: 5,
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop'
        },
        {
            id: 3,
            name: 'Sneha Gupta',
            text: "Meltora candles are now my go-to for relaxation. The scents are natural and not overpowering. Midnight Jasmine is my absolute favorite.",
            rating: 4,
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop'
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    const nextTestimonial = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section className="testimonials-section section">
            <div className="container">
                <div className="text-center mb-12">
                    <span className="section-subtitle">Customer Love</span>
                    <h2 className="section-title">What They Say</h2>
                </div>

                <div className="testimonial-carousel">
                    <button
                        className="carousel-btn prev-btn"
                        onClick={prevTestimonial}
                        aria-label="Previous Testimonial"
                    >
                        <FiChevronLeft />
                    </button>

                    <div className="testimonial-content fade-in">
                        <div className="testimonial-image-container">
                            <img
                                src={testimonials[activeIndex].image}
                                alt={testimonials[activeIndex].name}
                                className="testimonial-image"
                            />
                            <div className="quote-icon">"</div>
                        </div>

                        <div className="testimonial-text-content">
                            <div className="stars mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <FiStar
                                        key={i}
                                        className={i < testimonials[activeIndex].rating ? "star-filled" : "star-empty"}
                                    />
                                ))}
                            </div>

                            <p className="testimonial-quote">
                                {testimonials[activeIndex].text}
                            </p>

                            <h4 className="testimonial-author">
                                {testimonials[activeIndex].name}
                            </h4>
                            <span className="verified-badge">Verified Buyer</span>
                        </div>
                    </div>

                    <button
                        className="carousel-btn next-btn"
                        onClick={nextTestimonial}
                        aria-label="Next Testimonial"
                    >
                        <FiChevronRight />
                    </button>
                </div>

                <div className="carousel-dots">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            className={`dot ${index === activeIndex ? 'active' : ''}`}
                            onClick={() => setActiveIndex(index)}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
