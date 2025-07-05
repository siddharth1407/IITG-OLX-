import React from 'react';
import ProductCard from './ProductCard';

const MyProducts = ({ onNavigate, products, userId, onEditProduct, onDeleteProduct, onToggleProductStatus }) => { // Added onToggleProductStatus
    const myListedProducts = products.filter(p => p.sellerId === userId);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">My Listed Products</h2>
            {myListedProducts.length === 0 ? (
                <p className="text-center text-gray-600 text-lg">You haven't listed any products yet. <button onClick={() => onNavigate('sell')} className="text-blue-600 hover:underline">Sell something now!</button></p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {myListedProducts.map(product => (
                        <div key={product.id} className="flex flex-col">
                            <ProductCard
                                product={product}
                                isOwner={true}
                                onEdit={onEditProduct}
                                onDelete={onDeleteProduct}
                                // onViewDetails is not passed here as MyProducts doesn't directly navigate to detail, it's for managing own items
                            />
                            {/* Toggle Status Button */}
                            <button
                                onClick={() => onToggleProductStatus(product.id, product.status)}
                                className={`mt-2 py-2 px-4 rounded-md text-white font-semibold transition duration-200
                                            ${product.status === 'available' ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'}`}
                            >
                                {product.status === 'available' ? 'Mark as Sold' : 'Mark as Available'}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyProducts;
