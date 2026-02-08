import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { FiFilter, FiSearch } from 'react-icons/fi';
import ProductCard from '../components/shop/ProductCard';
import FilterSidebar from '../components/shop/FilterSidebar';
import SortDropdown from '../components/shop/SortDropdown';
import { getProducts } from '../services/productService';
import { products as initialProducts } from '../data/products';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentSort, setCurrentSort] = useState('popularity');
    const [filters, setFilters] = useState({
        collection: [],
        scent: [],
        priceRange: { min: 0, max: 0 },
        size: [],
        availability: []
    });

    const location = useLocation();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data.length > 0 ? data : initialProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
                setProducts(initialProducts);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Handle query params for initial filter
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const categoryParam = params.get('category');
        if (categoryParam) {
            // Map URL category to filter state logic if needed
            // For now just logging or simple mapping
        }
    }, [location.search]);

    // Filter and Sort Logic
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            // Search Filter
            if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                return false;
            }

            // Collection Filter
            if (filters.collection?.length > 0 && !filters.collection.includes(product.collection)) {
                return false;
            }

            // Scent Filter
            if (filters.scent?.length > 0 && !filters.scent.includes(product.scent)) {
                return false;
            }

            // Size Filter
            if (filters.size?.length > 0 && !filters.size.includes(product.size)) {
                return false;
            }

            // Price Filter
            const price = product.salePrice || product.price;
            if (filters.priceRange?.min > 0 && price < filters.priceRange.min) return false;
            if (filters.priceRange?.max > 0 && price > filters.priceRange.max) return false;

            return true;
        }).sort((a, b) => {
            const priceA = a.salePrice || a.price;
            const priceB = b.salePrice || b.price;

            switch (currentSort) {
                case 'price-low':
                    return priceA - priceB;
                case 'price-high':
                    return priceB - priceA;
                case 'newest':
                    return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
                case 'rating':
                    return b.rating - a.rating;
                case 'popularity':
                default:
                    return b.reviews - a.reviews;
            }
        });
    }, [products, filters, searchQuery, currentSort]);

    return (
        <div className="page-shop">
            <div className="shop-header-section section-sm bg-light">
                <div className="container text-center">
                    <h1 className="mb-2">Shop All Candles</h1>
                    <p className="text-muted">Discover our complete collection of hand-poured luxury candles.</p>
                </div>
            </div>

            <div className="container shop-container section">
                {/* Mobile Filter Toggle & Search */}
                <div className="shop-toolbar">
                    <button
                        className="filter-toggle-btn hidden-desktop"
                        onClick={() => setIsFilterOpen(true)}
                    >
                        <FiFilter /> Filters
                    </button>

                    <div className="search-bar">
                        <FiSearch />
                        <input
                            type="text"
                            placeholder="Search candles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="sort-wrapper hidden-mobile">
                        <SortDropdown
                            currentSort={currentSort}
                            onSortChange={setCurrentSort}
                        />
                    </div>
                </div>

                <div className="shop-layout">
                    <div className={`shop-sidebar-wrapper ${isFilterOpen ? 'open' : ''}`}>
                        <FilterSidebar
                            isOpen={isFilterOpen}
                            onClose={() => setIsFilterOpen(false)}
                            filters={filters}
                            setFilters={setFilters}
                        />
                    </div>

                    <div className="shop-content">
                        <div className="results-count mb-4 flex justify-between items-center">
                            <span>Showing {filteredProducts.length} results</span>
                            <div className="hidden-desktop">
                                <SortDropdown
                                    currentSort={currentSort}
                                    onSortChange={setCurrentSort}
                                />
                            </div>
                        </div>

                        {filteredProducts.length > 0 ? (
                            <div className="products-grid grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                                {filteredProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="no-results text-center py-12">
                                <h3>No products found</h3>
                                <p>Try adjusting your filters or search query.</p>
                                <button
                                    className="btn btn-secondary mt-4"
                                    onClick={() => {
                                        setFilters({});
                                        setSearchQuery('');
                                    }}
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
