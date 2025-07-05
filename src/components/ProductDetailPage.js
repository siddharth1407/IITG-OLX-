import React, { useState, useEffect } from 'react';
import { useFirebase } from '../firebase/FirebaseContext'; // Import useFirebase to get db and getUserProfile

const ProductDetailPage = ({ product, onBack }) => {
    const { db, getUserProfile } = useFirebase(); // Get db and getUserProfile from context
    const [sellerProfile, setSellerProfile] = useState(null);
    const [loadingSeller, setLoadingSeller] = useState(true);

    useEffect(() => {
        const fetchSellerProfile = async () => {
            if (product && product.sellerId && db) {
                setLoadingSeller(true);
                try {
                    const profile = await getUserProfile(product.sellerId, db);
                    setSellerProfile(profile);
                } catch (error) {
                    console.error("Failed to fetch seller profile:", error);
                    setSellerProfile(null); // Ensure no old data is shown
                } finally {
                    setLoadingSeller(false);
                }
            }
        };
        fetchSellerProfile();
    }, [product, db, getUserProfile]); // Re-fetch if product or db/getUserProfile changes

    if (!product) {
        return (
            <div className="container mx-auto p-4 text-center">
                <p className="text-xl text-gray-700">Product not found or data is missing.</p>
                <button
                    onClick={onBack}
                    className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                >
                    Back to Products
                </button>
            </div>
        );
    }

    const imageUrl = product.imageUrl || `https://placehold.co/800x600/e0e7ff/3f51b5?text=${encodeURIComponent(product.name)}`;

    return (
        <div className="container mx-auto p-4">
            <button
                onClick={onBack}
                className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition duration-200"
            >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                Back to Products
            </button>

            <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 lg:flex lg:space-x-8">
                {/* Product Image */}
                <div className="lg:w-1/2 flex justify-center items-center mb-6 lg:mb-0">
                    <img
                        src={imageUrl}
                        alt={product.name}
                        className="rounded-lg object-contain max-h-96 w-full shadow-lg"
                        onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/800x600/e0e7ff/3f51b5?text=Image+Not+Found"; }}
                    />
                </div>

                {/* Product Details */}
                <div className="lg:w-1/2">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
                    <p className="text-2xl font-bold text-green-600 mb-4">₹{product.price}</p>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">{product.description}</p>

                    <div className="mb-6">
                        <p className="text-sm text-gray-500">Category: <span className="font-semibold text-gray-700">{product.category}</span></p>
                        {loadingSeller ? (
                            <p className="text-sm text-gray-500">Listed by: <span className="font-semibold text-gray-700">Loading seller info...</span></p>
                        ) : sellerProfile ? (
                            <>
                                <p className="text-sm text-gray-500">Listed by: <span className="font-semibold text-gray-700">{sellerProfile.name || 'N/A'}</span></p>
                                {sellerProfile.hostel && <p className="text-sm text-gray-500">Hostel: <span className="font-semibold text-gray-700">{sellerProfile.hostel}</span></p>}
                                {sellerProfile.department && <p className="text-sm text-gray-500">Dept: <span className="font-semibold text-gray-700">{sellerProfile.department}</span></p>}
                            </>
                        ) : (
                            <p className="text-sm text-gray-500">Listed by: <span className="font-mono text-gray-700">{product.sellerId} (Profile not found)</span></p>
                        )}
                        {product.timestamp && (
                            <p className="text-sm text-gray-500">Listed on: <span className="font-semibold text-gray-700">{new Date(product.timestamp).toLocaleDateString()}</span></p>
                        )}
                    </div>

                    {/* Contact Seller Button (Placeholder) */}
                    <button
                        onClick={() => alert(`Contact seller: ${sellerProfile?.email || product.sellerId}\nPhone: ${sellerProfile?.contactPhone || 'N/A'}`)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                    >
                        Contact Seller
                    </button>
                    <p className="text-sm text-gray-500 mt-2 text-center">
                        (Currently, this just shows an alert. In a real app, this would open a chat or show contact info.)
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
