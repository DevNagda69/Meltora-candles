import { useState, useEffect } from 'react';
import ProductCard from '../shop/ProductCard';
import { getProducts } from '../../services/productService';
import './BestSellers.css';

const BestSellers = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBestSellers = async () => {
            try {
                const data = await getProducts();
                // Simulating Best Sellers by taking first 4 (or random)
                setProducts(data.slice(0, 4));
            } catch (error) {
                console.error("Failed to load best sellers", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBestSellers();
    }, []);

    if (loading || products.length === 0) return null;

    return (
        <section className="section best-sellers">
            <div className="container">
                <div className="section-header text-center mb-10">
                    <span className="text-warm-orange font-bold uppercase tracking-widest text-sm">Customer Favorites</span>
                    <h2 className="title-lg mt-2 mb-4 text-dark-brown">Best Sellers</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BestSellers;
