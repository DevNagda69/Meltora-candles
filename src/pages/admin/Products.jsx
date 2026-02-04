import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import AdminLayout from '../../components/admin/AdminLayout';
import Button from '../../components/common/Button';
import { getProducts, deleteProduct } from '../../services/productService';
import toast from 'react-hot-toast';
import './Products.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            toast.error('Failed to load products');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(id);
                toast.success('Product deleted');
                fetchProducts(); // Refresh list
            } catch (error) {
                toast.error('Failed to delete product');
                console.error(error);
            }
        }
    };

    return (
        <AdminLayout
            title="Products"
            actions={
                <Link to="/admin/products/add">
                    <Button variant="primary" size="small">
                        <FiPlus /> Add Product
                    </Button>
                </Link>
            }
        >
            {loading ? (
                <div className="text-center py-8">Loading products...</div>
            ) : (
                <div className="admin-card">
                    {products.length === 0 ? (
                        <div className="empty-state text-center py-12">
                            <p className="text-gray-500 mb-4">No products found.</p>
                            <Link to="/admin/products/add">
                                <Button variant="outline">Create your first product</Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Stock</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr key={product.id}>
                                            <td>
                                                <div className="table-img">
                                                    <img
                                                        src={product.image || 'https://via.placeholder.com/50'}
                                                        alt={product.name}
                                                    />
                                                </div>
                                            </td>
                                            <td className="font-medium">{product.name}</td>
                                            <td>{product.category}</td>
                                            <td>₹{product.price}</td>
                                            <td>
                                                <span className={`status-badge ${product.stock > 0 ? 'success' : 'error'}`}>
                                                    {product.stock}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="action-buttons">
                                                    <Link to={`/admin/products/edit/${product.id}`} className="icon-btn edit">
                                                        <FiEdit2 />
                                                    </Link>
                                                    <button
                                                        className="icon-btn delete"
                                                        onClick={() => handleDelete(product.id)}
                                                    >
                                                        <FiTrash2 />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </AdminLayout>
    );
};

export default Products;
