import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { FiBox, FiShoppingBag, FiDollarSign, FiTrendingUp, FiImage } from 'react-icons/fi';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalOrders: 0,
        totalRevenue: 0,
        galleryImages: 0
    });
    const [recentOrders, setRecentOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            // Fetch products count
            const productsSnapshot = await getDocs(collection(db, 'products'));
            const totalProducts = productsSnapshot.size;

            // Fetch orders
            const ordersSnapshot = await getDocs(collection(db, 'orders'));
            const totalOrders = ordersSnapshot.size;

            // Calculate total revenue
            let totalRevenue = 0;
            ordersSnapshot.docs.forEach(doc => {
                const order = doc.data();
                totalRevenue += order.total || 0;
            });

            // Fetch gallery images count
            const gallerySnapshot = await getDocs(collection(db, 'gallery'));
            const galleryImages = gallerySnapshot.size;

            // Fetch recent orders
            const recentOrdersQuery = query(
                collection(db, 'orders'),
                orderBy('createdAt', 'desc'),
                limit(5)
            );
            const recentOrdersSnapshot = await getDocs(recentOrdersQuery);
            const recentOrdersData = recentOrdersSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setStats({
                totalProducts,
                totalOrders,
                totalRevenue,
                galleryImages
            });
            setRecentOrders(recentOrdersData);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        return new Date(timestamp.seconds * 1000).toLocaleDateString();
    };

    const statCards = [
        {
            title: 'Total Products',
            value: stats.totalProducts,
            icon: <FiBox />,
            color: 'blue',
            link: '/admin/products'
        },
        {
            title: 'Total Orders',
            value: stats.totalOrders,
            icon: <FiShoppingBag />,
            color: 'green',
            link: '/admin/orders'
        },
        {
            title: 'Total Revenue',
            value: `₹${stats.totalRevenue.toLocaleString()}`,
            icon: <FiDollarSign />,
            color: 'purple',
            link: '/admin/orders'
        },
        {
            title: 'Gallery Images',
            value: stats.galleryImages,
            icon: <FiImage />,
            color: 'orange',
            link: '/admin/gallery'
        }
    ];

    return (
        <AdminLayout title="Dashboard">
            {loading ? (
                <div className="text-center py-8">Loading dashboard...</div>
            ) : (
                <div className="dashboard-container">
                    {/* Stats Cards */}
                    <div className="stats-grid">
                        {statCards.map((stat, index) => (
                            <Link
                                key={index}
                                to={stat.link}
                                className={`stat-card stat-${stat.color}`}
                            >
                                <div className="stat-icon">{stat.icon}</div>
                                <div className="stat-content">
                                    <h3 className="stat-title">{stat.title}</h3>
                                    <p className="stat-value">{stat.value}</p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Recent Orders */}
                    <div className="dashboard-section">
                        <div className="section-header">
                            <h2>Recent Orders</h2>
                            <Link to="/admin/orders" className="view-all-link">
                                View All
                            </Link>
                        </div>

                        {recentOrders.length === 0 ? (
                            <div className="empty-state">
                                <p>No orders yet</p>
                            </div>
                        ) : (
                            <div className="orders-list">
                                {recentOrders.map(order => (
                                    <div key={order.id} className="order-item">
                                        <div className="order-info">
                                            <div className="order-id">#{order.id.slice(0, 8)}</div>
                                            <div className="order-customer">
                                                {order.shipping?.firstName} {order.shipping?.lastName}
                                            </div>
                                        </div>
                                        <div className="order-details">
                                            <div className="order-date">{formatDate(order.createdAt)}</div>
                                            <div className="order-total">₹{order.total}</div>
                                            <span className={`order-status status-${order.status?.toLowerCase() || 'pending'}`}>
                                                {order.status || 'Pending'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Quick Actions */}
                    <div className="dashboard-section">
                        <h2>Quick Actions</h2>
                        <div className="quick-actions">
                            <Link to="/admin/products/add" className="action-btn">
                                <FiBox />
                                <span>Add Product</span>
                            </Link>
                            <Link to="/admin/gallery" className="action-btn">
                                <FiImage />
                                <span>Upload Gallery Image</span>
                            </Link>
                            <Link to="/admin/orders" className="action-btn">
                                <FiShoppingBag />
                                <span>View Orders</span>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default AdminDashboard;
