import { useState } from 'react';
import toast from 'react-hot-toast';
import Button from '../common/Button';
import './Newsletter.css';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            toast.success('Successfully subscribed to newsletter!');
            setEmail('');
            setLoading(false);
        }, 1500);
    };

    return (
        <section className="newsletter-section">
            <div className="container">
                <div className="newsletter-content">
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="text-3xl font-heading mb-4 text-dark-brown">Join the Meltora Family</h2>
                        <p className="text-lg mb-8 text-dark-gray">
                            Subscribe to receive updates, access to exclusive deals, and more.
                        </p>

                        <form onSubmit={handleSubmit} className="newsletter-form">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="newsletter-input"
                                required
                            />
                            <Button
                                type="submit"
                                variant="primary"
                                loading={loading}
                                className="newsletter-btn"
                            >
                                Subscribe
                            </Button>
                        </form>

                        <p className="privacy-note">
                            By subscribing you agree to our <a href="/privacy">Privacy Policy</a>.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
