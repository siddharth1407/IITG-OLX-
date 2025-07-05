import React, { useState } from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ onNavigate, products, userId, onEditProduct, onDeleteProduct, onViewDetails }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('All');
    const [filterStatus, setFilterStatus] = useState('available');

    const categories = ['All', 'Cycles', 'Electronics', 'Books', 'Furniture', 'Others'];
    const statuses = ['available', 'sold'];

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'All' || product.category === filterCategory;
        const matchesStatus = filterStatus === 'all' || product.status === filterStatus;

        return matchesSearch && matchesCategory && matchesStatus;
    });

    return (
        <div className="container mx-auto p-4">
            {/* IIT Guwahati Image */}
            <div className="mb-8 rounded-lg shadow-lg overflow-hidden">
                <img
                    src="https://iitg.ac.in/acad/admission/assets/img/banner.jpg" // Updated image URL
                    alt="IIT Guwahati Campus"
                    className="w-full h-48 object-cover"
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/1200x300/e0e7ff/3f51b5?text=Image+Not+Found"; }} // Updated fallback text
                />
            </div>

            <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Discover Products</h2>

            <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center items-center">
                <input
                    type="text"
                    placeholder="Search products..."
                    className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-1/2 lg:w-1/3"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-auto"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                >
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
                <select
                    className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-auto"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option value="all">All Statuses</option>
                    {statuses.map(s => (
                        <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                    ))}
                </select>
            </div>

            {filteredProducts.length === 0 ? (
                <p className="text-center text-gray-600 text-lg">No products found matching your criteria.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            isOwner={product.sellerId === userId}
                            onEdit={onEditProduct}
                            onDelete={onDeleteProduct}
                            onViewDetails={onViewDetails}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductList;
