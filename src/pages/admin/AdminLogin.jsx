import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import toast from 'react-hot-toast';
import './AdminLogin.css';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/admin/dashboard';

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error('Please enter both email and password');
            return;
        }

        try {
            setLoading(true);
            await login(email, password);
            toast.success('Welcome back, Admin!');
            navigate(from, { replace: true });
        } catch (error) {
            console.error('Login Error:', error);
            // Toast is already handled in AuthContext
            setLoading(false);
        }
    };

    return (
        <div className="admin-login-page">
            <div className="admin-login-card">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-heading text-dark-brown">Admin Login</h2>
                    <p className="text-dark-gray text-sm">Sign in to manage your store</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-4">
                        <label className="block text-sm font-bold mb-2 text-dark-brown">Email Address</label>
                        <input
                            type="email"
                            className="w-full p-3 border border-gray-300 rounded-md focus:border-warm-orange focus:outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@meltora.com"
                            required
                        />
                    </div>

                    <div className="form-group mb-6">
                        <label className="block text-sm font-bold mb-2 text-dark-brown">Password</label>
                        <input
                            type="password"
                            className="w-full p-3 border border-gray-300 rounded-md focus:border-warm-orange focus:outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <Button
                        variant="primary"
                        className="w-full"
                        type="submit"
                        loading={loading}
                    >
                        Sign In
                    </Button>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-xs text-gray-400">Restricted Area. Authorized Personnel Only.</p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
