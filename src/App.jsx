import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';

// Layout Components (keep these loaded)
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Lazy load pages for code splitting
// Core pages (loaded immediately for speed)
import Home from './pages/Home';
import Shop from './pages/Shop';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

// Lazy load less frequent pages
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const Checkout = lazy(() => import('./pages/Checkout'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const FAQ = lazy(() => import('./pages/FAQ'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/Terms'));

// Admin Sub-Pages
const AdminSetup = lazy(() => import('./pages/admin/AdminSetup'));
const Products = lazy(() => import('./pages/admin/Products'));
const ManageProduct = lazy(() => import('./pages/admin/ManageProduct'));
const Orders = lazy(() => import('./pages/admin/Orders'));
const Gallery = lazy(() => import('./components/admin/Gallery'));

// Context Providers
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

// Common Components
import WhatsAppButton from './components/common/WhatsAppButton';
import CartDrawer from './components/cart/CartDrawer';
import ProtectedRoute from './components/admin/ProtectedRoute';

// Loading Spinner Component
const PageLoader = () => (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'var(--color-bg-primary)'
    }}>
        <div className="spinner" style={{
            width: '50px',
            height: '50px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid var(--color-primary)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
        }}></div>
    </div>
);

function App() {
    return (
        <Router>
            <AuthProvider>
                <CartProvider>
                    <div className="app">
                        <Toaster
                            position="top-right"
                            toastOptions={{
                                duration: 3000,
                                style: {
                                    background: '#3D2817',
                                    color: '#fff',
                                    fontFamily: 'Inter, sans-serif',
                                },
                                success: {
                                    iconTheme: {
                                        primary: '#4CAF50',
                                        secondary: '#fff',
                                    },
                                },
                                error: {
                                    iconTheme: {
                                        primary: '#F44336',
                                        secondary: '#fff',
                                    },
                                },
                            }}
                        />

                        <Suspense fallback={<PageLoader />}>
                            <Routes>
                                {/* Admin Routes - Must come BEFORE wildcard route */}
                                <Route path="/admin/setup" element={<AdminSetup />} />
                                <Route path="/admin/login" element={<AdminLogin />} />
                                <Route path="/admin/dashboard" element={
                                    <ProtectedRoute>
                                        <AdminDashboard />
                                    </ProtectedRoute>
                                } />
                                <Route path="/admin/products" element={
                                    <ProtectedRoute>
                                        <Products />
                                    </ProtectedRoute>
                                } />
                                <Route path="/admin/products/add" element={
                                    <ProtectedRoute>
                                        <ManageProduct />
                                    </ProtectedRoute>
                                } />
                                <Route path="/admin/products/edit/:id" element={
                                    <ProtectedRoute>
                                        <ManageProduct />
                                    </ProtectedRoute>
                                } />
                                <Route path="/admin/orders" element={
                                    <ProtectedRoute>
                                        <Orders />
                                    </ProtectedRoute>
                                } />
                                <Route path="/admin/gallery" element={
                                    <ProtectedRoute>
                                        <Gallery />
                                    </ProtectedRoute>
                                } />

                                {/* Public Routes */}
                                <Route
                                    path="/*"
                                    element={
                                        <>
                                            <Header />
                                            <main className="main-content-wrapper">
                                                <Routes>
                                                    <Route path="/" element={<Home />} />
                                                    <Route path="/shop" element={<Shop />} />
                                                    <Route path="/product/:id" element={<ProductDetails />} />
                                                    <Route path="/checkout" element={<Checkout />} />
                                                    <Route path="/about" element={<About />} />
                                                    <Route path="/contact" element={<Contact />} />
                                                    <Route path="/faq" element={<FAQ />} />
                                                    <Route path="/privacy" element={<PrivacyPolicy />} />
                                                    <Route path="/terms" element={<Terms />} />
                                                </Routes>
                                            </main>
                                            <Footer />
                                            <WhatsAppButton />
                                            <CartDrawer />
                                        </>
                                    }
                                />
                            </Routes>
                        </Suspense>
                    </div>
                </CartProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;

