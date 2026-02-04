import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { currentUser, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className="p-8 text-center">Loading...</div>;
    }

    if (!currentUser) {
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }

    // Optional: Check for admin role
    // if (currentUser.role !== 'admin') {
    //   return <div className="p-8 text-center">Access Denied. Admin privileges required.</div>;
    // }

    return children;
};

export default ProtectedRoute;
