import { lazy, Suspense } from 'react';
import Hero from '../components/home/Hero';
import FeaturedCandles from '../components/home/FeaturedCandles';

// Lazy load below-the-fold components
const BestSellers = lazy(() => import('../components/home/BestSellers'));
const Testimonials = lazy(() => import('../components/home/Testimonials'));
const Newsletter = lazy(() => import('../components/home/Newsletter'));
const InstagramGallery = lazy(() => import('../components/home/InstagramGallery'));

// Loading component
const ComponentLoader = () => (
    <div className="container" style={{ padding: '40px 0' }}>
        <div className="skeleton-section">
            <div className="skeleton-title"></div>
            <div className="skeleton-grid">
                <div className="skeleton-card"></div>
                <div className="skeleton-card"></div>
                <div className="skeleton-card"></div>
            </div>
        </div>
    </div>
);

const Home = () => {
    return (
        <div className="page-home">
            <Hero />
            <FeaturedCandles />
            <Suspense fallback={<ComponentLoader />}>
                <BestSellers />
            </Suspense>
            <Suspense fallback={<ComponentLoader />}>
                <Testimonials />
            </Suspense>
            <Suspense fallback={<ComponentLoader />}>
                <Newsletter />
            </Suspense>
            <Suspense fallback={<ComponentLoader />}>
                <InstagramGallery />
            </Suspense>
        </div>
    );
};

export default Home;
