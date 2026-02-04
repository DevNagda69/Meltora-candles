import { FiStar } from 'react-icons/fi';
import './ProductInfo.css';

const ProductInfo = ({ product, price }) => {
    return (
        <div className="product-info-container">
            <div className="product-header">
                <span className="product-collection">{product.collection} Collection</span>
                <h1 className="product-title">{product.name}</h1>

                <div className="product-meta">
                    <div className="rating-container">
                        <div className="stars">
                            {[...Array(5)].map((_, i) => (
                                <FiStar
                                    key={i}
                                    className={i < Math.floor(product.rating) ? "star-filled" : "star-empty"}
                                />
                            ))}
                        </div>
                        <span className="review-count">({product.reviews} Reviews)</span>
                    </div>
                    <span className="stock-status">
                        {product.stock > 0 ? (
                            <span className="text-success">In Stock</span>
                        ) : (
                            <span className="text-error">Out of Stock</span>
                        )}
                    </span>
                </div>

                <div className="product-price-large">
                    ₹{price}
                </div>
            </div>

            <div className="product-description">
                <p>{product.description}</p>
            </div>

            <div className="product-details-accordion">
                <div className="detail-item">
                    <h4>Scent Profile</h4>
                    <p>{product.scent}</p>
                </div>
                <div className="detail-item">
                    <h4>Ingredients</h4>
                    <p>{product.ingredients}</p>
                </div>
                <div className="detail-item">
                    <h4>Burn Time</h4>
                    <p>{product.burnTime}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;
