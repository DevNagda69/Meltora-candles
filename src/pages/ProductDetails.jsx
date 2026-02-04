import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ImageGallery from '../components/product/ImageGallery';
import ProductInfo from '../components/product/ProductInfo';
import VariationSelector from '../components/product/VariationSelector';
import AddToCart from '../components/product/AddToCart';
import RelatedProducts from '../components/product/RelatedProducts';
import { products } from '../data/products';
import './ProductDetails.css';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    // State for selections
    const [selections, setSelections] = useState({
        size: 'Medium (200g)',
        fragrance: ''
    });

    // Calculate dynamic price based on selections
    const [currentPrice, setCurrentPrice] = useState(0);

    useEffect(() => {
        // Simulate API fetch delay
        setLoading(true);
        setTimeout(() => {
            const foundProduct = products.find(p => p.id === parseInt(id));
            if (foundProduct) {
                setProduct(foundProduct);
                setSelections(prev => ({
                    ...prev,
                    fragrance: foundProduct.scent
                }));
                setCurrentPrice(foundProduct.salePrice || foundProduct.price);
            }
            setLoading(false);
        }, 300);

        // Scroll to top when id changes
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) {
        return (
            <div className="loading-container section">
                <div className="loading"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container section text-center">
                <h2>Product not found</h2>
                <button className="btn btn-primary" onClick={() => navigate('/shop')}>
                    Return to Shop
                </button>
            </div>
        );
    }

    // Define variations logic (mock data)
    const variations = {
        sizes: [
            { value: 'Small (100g)', label: 'Small', priceAdjustment: -200 },
            { value: 'Medium (200g)', label: 'Medium', priceAdjustment: 0 },
            { value: 'Large (400g)', label: 'Large', priceAdjustment: 400 }
        ],
        // Only show fragrance if needed, but usually a product is one fragrance
        // We could show "Fragrance Notes" instead
    };

    const handleSelectionChange = (type, value) => {
        setSelections(prev => ({
            ...prev,
            [type]: value
        }));

        // Update price logic
        if (type === 'size') {
            const sizeOption = variations.sizes.find(s => s.value === value);
            const basePrice = product.salePrice || product.price;
            setCurrentPrice(basePrice + (sizeOption ? sizeOption.priceAdjustment : 0));
        }
    };

    // Prepare images array
    const detailedImages = product.images ? product.images : [product.image];

    return (
        <div className="page-product-details section">
            <div className="container">
                <div className="product-layout">
                    {/* Left Column - Gallery */}
                    <div className="product-gallery-wrapper">
                        <ImageGallery images={detailedImages} />
                    </div>

                    {/* Right Column - Info & Actions */}
                    <div className="product-info-wrapper">
                        <ProductInfo product={product} price={currentPrice} />

                        <VariationSelector
                            variations={variations}
                            selections={selections}
                            onSelectionChange={handleSelectionChange}
                        />

                        <AddToCart
                            product={product}
                            selections={selections}
                            currentPrice={currentPrice}
                        />

                        {/* Additional Policy Info */}
                        <div className="product-policies">
                            <div className="policy-item">
                                <span className="policy-icon">🚚</span>
                                <div>
                                    <strong>Free Shipping</strong>
                                    <p>On orders above ₹999</p>
                                </div>
                            </div>
                            <div className="policy-item">
                                <span className="policy-icon">↩️</span>
                                <div>
                                    <strong>Easy Returns</strong>
                                    <p>7-day replacement policy</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                <RelatedProducts currentProductId={id} category={product.category} />
            </div>
        </div>
    );
};

export default ProductDetails;
