import { useState, useEffect } from 'react';
import { FiUpload, FiX } from 'react-icons/fi';
import Button from '../common/Button';
import './ProductForm.css';

const ProductForm = ({ initialData, onSubmit, loading }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        salePrice: '',
        category: 'Floral',
        collection: 'Signature',
        scent: '',
        size: 'Medium (200g)',
        stock: '',
        ingredients: '',
        burnTime: ''
    });

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                description: initialData.description || '',
                price: initialData.price || '',
                salePrice: initialData.salePrice || '',
                category: initialData.category || 'Floral',
                collection: initialData.collection || 'Signature',
                scent: initialData.scent || '',
                size: initialData.size || 'Medium (200g)',
                stock: initialData.stock || '',
                ingredients: initialData.ingredients || '',
                burnTime: initialData.burnTime || ''
            });
            if (initialData.image) {
                setImagePreview(initialData.image);
            }
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Convert numeric strings to numbers
        const processedData = {
            ...formData,
            price: Number(formData.price),
            salePrice: formData.salePrice ? Number(formData.salePrice) : null,
            stock: Number(formData.stock)
        };
        onSubmit(processedData, imageFile);
    };

    return (
        <form onSubmit={handleSubmit} className="product-form">
            <div className="form-grid">
                {/* Left Column - Basic Info */}
                <div className="form-column">
                    <div className="form-group">
                        <label>Product Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            name="description"
                            rows="4"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Price (₹)</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Sale Price (Optional)</label>
                            <input
                                type="number"
                                name="salePrice"
                                value={formData.salePrice}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Category</label>
                            <select name="category" value={formData.category} onChange={handleChange}>
                                <option value="Floral">Floral</option>
                                <option value="Woody">Woody</option>
                                <option value="Fresh">Fresh</option>
                                <option value="Sweet">Sweet</option>
                                <option value="Citrus">Citrus</option>
                                <option value="Spicy">Spicy</option>
                                <option value="Relaxation">Relaxation</option>
                                <option value="Festive">Festive</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Collection</label>
                            <select name="collection" value={formData.collection} onChange={handleChange}>
                                <option value="Signature">Signature</option>
                                <option value="Seasonal">Seasonal</option>
                                <option value="Limited Edition">Limited Edition</option>
                                <option value="Gift Sets">Gift Sets</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Right Column - Details & Image */}
                <div className="form-column">
                    <div className="form-group">
                        <label>Product Image</label>
                        <div className="image-upload-area">
                            {imagePreview ? (
                                <div className="image-preview">
                                    <img src={imagePreview} alt="Preview" />
                                    <button
                                        type="button"
                                        className="remove-image"
                                        onClick={() => {
                                            setImageFile(null);
                                            setImagePreview(null);
                                        }}
                                    >
                                        <FiX />
                                    </button>
                                </div>
                            ) : (
                                <div className="upload-placeholder">
                                    <input
                                        type="file"
                                        id="image-upload"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                    <label htmlFor="image-upload">
                                        <FiUpload />
                                        <span>Click to upload image</span>
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Stock Quantity</label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Size Label</label>
                            <input
                                type="text"
                                name="size"
                                value={formData.size}
                                onChange={handleChange}
                                placeholder="e.g. Medium (200g)"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Scent Notes</label>
                        <input
                            type="text"
                            name="scent"
                            value={formData.scent}
                            onChange={handleChange}
                            placeholder="e.g. Jasmine, Sandalwood"
                        />
                    </div>

                    <div className="form-group">
                        <label>Ingredients</label>
                        <textarea
                            name="ingredients"
                            rows="2"
                            value={formData.ingredients}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label>Burn Time</label>
                        <input
                            type="text"
                            name="burnTime"
                            value={formData.burnTime}
                            onChange={handleChange}
                            placeholder="e.g. 40-50 hours"
                        />
                    </div>
                </div>
            </div>

            <div className="form-actions mt-6">
                <Button variant="primary" type="submit" loading={loading}>
                    {initialData ? 'Update Product' : 'Create Product'}
                </Button>
            </div>
        </form>
    );
};

export default ProductForm;
