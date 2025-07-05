import React from 'react';

const ProductCard = ({ product, onEdit, onDelete, isOwner, onViewDetails }) => {
    // Placeholder image URL
    const imageUrl = product.imageUrl || `https://placehold.co/400x300/e0e7ff/3f51b5?text=${encodeURIComponent(product.name)}`;

    // Determine if the product is sold
    const isSold = product.status === 'sold';

    return (
        <div
            className={`bg-white rounded-lg shadow-xl overflow-hidden transform transition duration-300 flex flex-col relative
                        ${isSold ? 'opacity-70 grayscale cursor-not-allowed' : 'hover:scale-105 hover:shadow-2xl cursor-pointer'}`}
            onClick={() => !isSold && onViewDetails(product)} // Only view details if not sold
        >
            {isSold && (
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-md">
                    SOLD
                </div>
            )}
            <img src={imageUrl} alt={product.name} className="w-full h-48 object-cover" onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x300/e0e7ff/3f51b5?text=Image+Not+Found"; }} />
            <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                    <p className="text-gray-700 text-base mb-3 line-clamp-3">{product.description}</p>
                </div>
                <div className="flex justify-between items-center mt-auto">
                    <span className="text-2xl font-extrabold text-green-600">₹{product.price}</span>
                    {isOwner && (
                        <div className="flex gap-2">
                            <button
                                onClick={(e) => { e.stopPropagation(); onEdit(product); }}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm transition duration-200"
                            >
                                Edit
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); onDelete(product.id); }}
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition duration-200"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
