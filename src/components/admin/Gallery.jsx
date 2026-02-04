import { useState, useEffect } from 'react';
import { FiUpload, FiTrash2, FiImage } from 'react-icons/fi';
import { uploadGalleryImage, getGalleryImages, deleteGalleryImage } from '../../services/galleryService';
import AdminLayout from './AdminLayout';
import './Gallery.css';

const Gallery = () => {
    const [galleryImages, setGalleryImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        loadGalleryImages();
    }, []);

    const loadGalleryImages = async () => {
        try {
            const images = await getGalleryImages();
            setGalleryImages(images);
        } catch (error) {
            console.error('Error loading gallery images:', error);
            alert('Failed to load gallery images');
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('Image size should be less than 5MB');
            return;
        }

        setUploading(true);
        try {
            const newImage = await uploadGalleryImage(file);
            setGalleryImages([newImage, ...galleryImages]);
            alert('Image uploaded successfully!');
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image');
        } finally {
            setUploading(false);
            e.target.value = '';
        }
    };

    const handleDeleteImage = async (imageId, storagePath) => {
        if (!confirm('Are you sure you want to delete this image?')) return;

        try {
            await deleteGalleryImage(imageId, storagePath);
            setGalleryImages(galleryImages.filter(img => img.id !== imageId));
            alert('Image deleted successfully!');
        } catch (error) {
            console.error('Error deleting image:', error);
            alert('Failed to delete image');
        }
    };

    return (
        <AdminLayout title="Instagram Gallery">
            <div className="admin-gallery">
                <p className="gallery-description">Manage images displayed in the Instagram gallery section</p>

                <div className="upload-section">
                    <label htmlFor="gallery-upload" className="upload-button">
                        <FiUpload />
                        {uploading ? 'Uploading...' : 'Upload Image'}
                    </label>
                    <input
                        id="gallery-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploading}
                        style={{ display: 'none' }}
                    />
                    <p className="upload-hint">Recommended: Square images (1:1 ratio), max 5MB</p>
                </div>

                {loading ? (
                    <div className="loading-state">Loading gallery...</div>
                ) : galleryImages.length === 0 ? (
                    <div className="empty-state">
                        <FiImage size={48} />
                        <p>No images yet</p>
                        <p className="text-muted">Upload your first gallery image</p>
                    </div>
                ) : (
                    <div className="gallery-grid">
                        {galleryImages.map((image) => (
                            <div key={image.id} className="gallery-item">
                                <img src={image.imageUrl} alt="Gallery" />
                                <div className="gallery-item-overlay">
                                    <button
                                        onClick={() => handleDeleteImage(image.id, image.storagePath)}
                                        className="delete-button"
                                        title="Delete image"
                                    >
                                        <FiTrash2 />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default Gallery;

