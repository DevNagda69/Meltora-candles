import { useState } from 'react';
import './ImageGallery.css';

const ImageGallery = ({ images = [] }) => {
    const [mainImage, setMainImage] = useState(images[0]);
    const [zoomStyle, setZoomStyle] = useState({});

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = (e.clientX - left) / width * 100;
        const y = (e.clientY - top) / height * 100;

        setZoomStyle({
            transformOrigin: `${x}% ${y}%`,
            transform: 'scale(2)'
        });
    };

    const handleMouseLeave = () => {
        setZoomStyle({
            transformOrigin: 'center center',
            transform: 'scale(1)'
        });
    };

    if (!images.length) return null;

    return (
        <div className="product-gallery">
            <div
                className="main-image-container"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <img
                    src={mainImage}
                    alt="Product Detail"
                    className="main-image"
                    style={zoomStyle}
                    onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1603006373366-07a82747385d?auto=format&fit=crop&q=80&w=800&h=1000&text=Premium+Candle';
                        e.target.onerror = null;
                    }}
                />
                <div className="zoom-hint hidden-mobile">Roll over image to zoom in</div>
            </div>

            {images.length > 1 && (
                <div className="thumbnails-row">
                    {images.map((img, index) => (
                        <button
                            key={index}
                            className={`thumbnail-btn ${mainImage === img ? 'active' : ''}`}
                            onClick={() => setMainImage(img)}
                        >
                            <img
                                src={img}
                                alt={`View ${index + 1}`}
                                onError={(e) => {
                                    e.target.src = 'https://images.unsplash.com/photo-1603006373366-07a82747385d?auto=format&fit=crop&q=80&w=150&h=150';
                                    e.target.onerror = null;
                                }}
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageGallery;
