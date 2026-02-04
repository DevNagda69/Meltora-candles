import { useEffect, useState } from 'react';
import { createAdminAccount } from '../../utils/setupAdmin';
import { useNavigate } from 'react-router-dom';

const AdminSetup = () => {
    const [status, setStatus] = useState('');
    const [credentials, setCredentials] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setupAdmin();
    }, []);

    const setupAdmin = async () => {
        setStatus('Creating admin account...');
        try {
            const result = await createAdminAccount();
            setCredentials(result);
            setStatus('Admin account created successfully!');
        } catch (error) {
            setStatus('Error: ' + error.message);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #F5E6D3 0%, #E8D5C4 100%)',
            padding: '20px'
        }}>
            <div style={{
                background: 'white',
                padding: '40px',
                borderRadius: '16px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                maxWidth: '500px',
                width: '100%'
            }}>
                <h1 style={{
                    fontSize: '28px',
                    marginBottom: '20px',
                    color: '#3D2817',
                    textAlign: 'center'
                }}>
                    Admin Account Setup
                </h1>

                <div style={{
                    padding: '20px',
                    background: '#f8f9fa',
                    borderRadius: '8px',
                    marginBottom: '20px'
                }}>
                    <p style={{ marginBottom: '10px', fontWeight: '600' }}>{status}</p>

                    {credentials && (
                        <div style={{ marginTop: '20px' }}>
                            <h3 style={{ marginBottom: '15px', color: '#3D2817' }}>
                                Your Admin Credentials:
                            </h3>
                            <div style={{
                                background: 'white',
                                padding: '15px',
                                borderRadius: '8px',
                                border: '2px solid #D4A574'
                            }}>
                                <p style={{ marginBottom: '10px' }}>
                                    <strong>Email:</strong> {credentials.email}
                                </p>
                                <p style={{ marginBottom: '10px' }}>
                                    <strong>Password:</strong> {credentials.password}
                                </p>
                            </div>
                            <p style={{
                                marginTop: '15px',
                                fontSize: '14px',
                                color: '#666'
                            }}>
                                ⚠️ Please save these credentials securely!
                            </p>
                        </div>
                    )}
                </div>

                <button
                    onClick={() => navigate('/admin/login')}
                    style={{
                        width: '100%',
                        padding: '12px',
                        background: '#D4A574',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer'
                    }}
                >
                    Go to Admin Login
                </button>
            </div>
        </div>
    );
};

export default AdminSetup;
