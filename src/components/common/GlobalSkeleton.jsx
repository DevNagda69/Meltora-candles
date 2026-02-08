import './GlobalSkeleton.css';

const GlobalSkeleton = () => {
    return (
        <div className="global-skeleton-wrapper">
            <div className="skeleton-header-placeholder"></div>
            <div className="container">
                <div className="skeleton-hero-placeholder"></div>
                <div className="skeleton-grid">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="skeleton-card-v2">
                            <div className="skeleton-img"></div>
                            <div className="skeleton-line short"></div>
                            <div className="skeleton-line long"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GlobalSkeleton;
