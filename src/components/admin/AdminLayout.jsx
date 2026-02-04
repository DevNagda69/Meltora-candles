import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiGrid, FiBox, FiShoppingBag, FiLogOut, FiHome, FiImage } from 'react-icons/fi';
import './AdminLayout.css';

const AdminLayout = ({ children, title, actions }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/admin/login');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    const navItems = [
        { label: 'Dashboard', path: '/admin/dashboard', icon: <FiGrid /> },
        { label: 'Products', path: '/admin/products', icon: <FiBox /> },
        { label: 'Orders', path: '/admin/orders', icon: <FiShoppingBag /> },
        { label: 'Gallery', path: '/admin/gallery', icon: <FiImage /> },
    ];

    return (
        <div className="admin-layout">
            {/* Sidebar */}
            <aside className="admin-sidebar">
                <div className="admin-brand">
                    <h2>Meltora Admin</h2>
                </div>

                <nav className="admin-nav">
                    <ul>
                        {navItems.map(item => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`admin-nav-item ${location.pathname === item.path ? 'active' : ''}`}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="admin-footer-nav">
                    <Link to="/" className="admin-nav-item">
                        <FiHome />
                        <span>View Site</span>
                    </Link>
                    <button onClick={handleLogout} className="admin-nav-item logout-btn">
                        <FiLogOut />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="admin-content">
                <header className="admin-header">
                    <h1>{title}</h1>
                    <div className="header-actions">
                        {actions}
                    </div>
                </header>

                <div className="admin-page-content">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
