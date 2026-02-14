import { useState, useEffect } from 'react';
import { FiInstagram } from 'react-icons/fi';
import { getGalleryImages } from '../../services/galleryService';
import './InstagramGallery.css';

const InstagramGallery = () => {
    const [galleryImages, setGalleryImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadGalleryImages();
    }, []);

    const loadGalleryImages = async () => {
        try {
            const firebaseImages = await getGalleryImages();

            // Add local fallback images for demo/localhost
            const localImages = [
                {
                    id: 'local-heart-candle',
                    imageUrl: '/images/instagram/heart-candle.jpg',
                    createdAt: new Date(Date.now() - 1000).toISOString()
                },
                {
                    id: 'local-gift-box',
                    imageUrl: '/images/instagram/gift-box.jpg',
                    createdAt: new Date(Date.now() - 2000).toISOString()
                },
                {
                    id: 'local-rose-bouquet',
                    imageUrl: '/images/instagram/rose-bouquet.jpg',
                    createdAt: new Date(Date.now() - 3000).toISOString()
                }
            ];

            // Combine and sort by createdAt
            const combinedImages = [...localImages, ...firebaseImages].sort((a, b) =>
                new Date(b.createdAt) - new Date(a.createdAt)
            );

            setGalleryImages(combinedImages);
        } catch (error) {
            console.error('Error loading gallery images:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="insta-section section">
            <div className="container">
                <div className="text-center mb-10">
                    <a
                        href="https://instagram.com/meltora.candles"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="insta-handle"
                    >
                        <FiInstagram /> @meltora.candles
                    </a>
                    <h2 className="section-title">Follow Us On Instagram</h2>
                </div>

                {loading ? null : galleryImages.length === 0 ? (
                    <div className="text-center">No images yet. Add some from the admin panel!</div>
                ) : (
                    <div className="insta-grid">
                        {galleryImages.map((item, index) => (
                            <a
                                key={item.id}
                                href="https://instagram.com/meltora.candles"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="insta-item group"
                            >
                                <img src={item.imageUrl} alt={`Instagram post ${index + 1}`} loading="lazy" />
                                <div className="insta-overlay">
                                    <FiInstagram />
                                </div>
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default InstagramGallery;

