import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import ProductForm from '../../components/admin/ProductForm';
import { addProduct, getProduct, updateProduct } from '../../services/productService';
import toast from 'react-hot-toast';

const ManageProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [initialData, setInitialData] = useState(null);
    const [fetchLoading, setFetchLoading] = useState(!!id);

    useEffect(() => {
        if (id) {
            fetchProductData();
        }
    }, [id]);

    const fetchProductData = async () => {
        try {
            const data = await getProduct(id);
            setInitialData(data);
        } catch (error) {
            toast.error('Failed to load product');
            navigate('/admin/products');
        } finally {
            setFetchLoading(false);
        }
    };

    const handleSubmit = async (formData, imageFile) => {
        setLoading(true);
        try {
            if (id) {
                await updateProduct(id, formData, imageFile);
                toast.success('Product updated successfully');
            } else {
                await addProduct(formData, imageFile);
                toast.success('Product created successfully');
            }
            navigate('/admin/products');
        } catch (error) {
            console.error(error);
            toast.error(id ? 'Failed to update product' : 'Failed to create product');
        } finally {
            setLoading(false);
        }
    };

    if (fetchLoading) {
        return (
            <AdminLayout title={id ? "Edit Product" : "Add Product"}>
                <div className="text-center py-8">Loading...</div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout title={id ? "Edit Product" : "Add Product"}>
            <div className="max-w-4xl mx-auto">
                <ProductForm
                    initialData={initialData}
                    onSubmit={handleSubmit}
                    loading={loading}
                />
            </div>
        </AdminLayout>
    );
};

export default ManageProduct;
