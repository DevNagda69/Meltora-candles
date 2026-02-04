import { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../services/firebase';
import AdminLayout from '../../components/admin/AdminLayout';
import { FiEye } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
            const snapshot = await getDocs(q);
            const ordersData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setOrders(ordersData);
        } catch (error) {
            console.error('Error fetching orders:', error);
            toast.error('Failed to load orders');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        return new Date(timestamp.seconds * 1000).toLocaleDateString();
    };

    return (
        <AdminLayout title="Orders">
            {loading ? (
                <div className="text-center py-8">Loading orders...</div>
            ) : (
                <div className="admin-card">
                    {orders.length === 0 ? (
                        <div className="empty-state text-center py-12">
                            <p className="text-gray-500">No orders received yet.</p>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Date</th>
                                        <th>Customer</th>
                                        <th>Items</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order.id}>
                                            <td className="font-mono text-sm">{order.id.slice(0, 8)}...</td>
                                            <td>{formatDate(order.createdAt)}</td>
                                            <td>
                                                <div className="text-sm font-medium">{order.shipping?.firstName} {order.shipping?.lastName}</div>
                                                <div className="text-xs text-gray-500">{order.shipping?.email}</div>
                                            </td>
                                            <td>{order.items?.length || 0} items</td>
                                            <td className="font-bold">₹{order.total}</td>
                                            <td>
                                                <span className={`status-badge ${order.status === 'Delivered' ? 'success' :
                                                        order.status === 'Cancelled' ? 'error' : 'warning'
                                                    }`}>
                                                    {order.status || 'Pending'}
                                                </span>
                                            </td>
                                            <td>
                                                <button className="icon-btn edit" title="View Details">
                                                    <FiEye />
                                                </button>
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

export default Orders;
