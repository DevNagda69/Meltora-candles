import { useState, useEffect } from 'react';
import ProductCard from '../shop/ProductCard';
import { getProducts } from '../../services/productService'; // Should Ideally fetch by category
import './RelatedProducts.css';

const RelatedProducts = ({ currentProduct }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchRelated = async () => {
            if (!currentProduct) return;

            try {
                const allProducts = await getProducts();
                // Filter by same category, exclude current
                const related = allProducts
                    .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
                    .slice(0, 4);

                setProducts(related);
            } catch (error) {
                console.error("Failed to load related products");
            }
        };

        fetchRelated();
    }, [currentProduct]);

    if (products.length === 0) return null;

    return (
        <div className="related-products">
            <h3 className="text-2xl font-heading text-dark-brown mb-8 text-center">You May Also Like</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default RelatedProducts;
