import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../shop/ProductCard';
import { getLatestProducts } from '../../services/productService';
import './FeaturedCandles.css';

const FeaturedCandles = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const data = await getLatestProducts(4);
                setProducts(data);
            } catch (error) {
                console.error("Failed to load featured products", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeatured();
    }, []);

    if (loading) return null; // Or skeleton
    if (products.length === 0) return null;

    return (
        <section className="section bg-light featured-candles">
            <div className="container">
                <div className="section-header text-center mb-10">
                    <h2 className="title-lg mb-4 text-dark-brown">New Arrivals</h2>
                    <p className="subtitle mx-auto max-w-2xl text-gray-600">
                        Discover our latest handcrafted creations, designed to elevate your space.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link to="/shop" className="btn btn-primary">
                        View All Collection
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedCandles;
