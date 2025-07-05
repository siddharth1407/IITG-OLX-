import React, { useState, useEffect } from 'react';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
// Removed: import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useFirebase } from '../firebase/FirebaseContext';

const SellProductForm = ({ onNavigate, productToEdit, onProductAddedOrUpdated }) => {
    const { db, userId } = useFirebase(); // Removed 'app' as it's not needed for storage now
    const [name, setName] = useState(productToEdit?.name || '');
    const [description, setDescription] = useState(productToEdit?.description || '');
    const [price, setPrice] = useState(productToEdit?.price || '');
    const [category, setCategory] = useState(productToEdit?.category || 'Cycles');
    const [status, setStatus] = useState(productToEdit?.status || 'available');
    const [imageUrl, setImageUrl] = useState(productToEdit?.imageUrl || ''); // Keep imageUrl for direct input
    // Removed: const [imageFile, setImageFile] = useState(null);
    // Removed: const [uploadProgress, setUploadProgress] = useState(0);
    // Removed: const [isUploading, setIsUploading] = useState(false);
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const categories = ['Cycles', 'Electronics', 'Books', 'Furniture', 'Others'];
    const statuses = ['available', 'sold'];

    useEffect(() => {
        if (productToEdit) {
            setName(productToEdit.name);
            setDescription(productToEdit.description);
            setPrice(productToEdit.price);
            setCategory(categories.includes(productToEdit.category) ? productToEdit.category : 'Cycles');
            setStatus(statuses.includes(productToEdit.status) ? productToEdit.status : 'available');
            setImageUrl(productToEdit.imageUrl || ''); // Keep existing image URL
            // Removed: setImageFile(null);
            // Removed: setUploadProgress(0);
            // Removed: setIsUploading(false);
        } else {
            // Reset form if no productToEdit
            setName('');
            setDescription('');
            setPrice('');
            setCategory('Cycles');
            setStatus('available');
            setImageUrl(''); // Clear image URL for new products
            // Removed: setImageFile(null);
            // Removed: setUploadProgress(0);
            // Removed: setIsUploading(false);
        }
        setMessage('');
    }, [productToEdit]);


    // Removed handleFileChange function
    // Removed uploadImage function

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!db || !userId) {
            setMessage('Error: User not authenticated or database not ready.');
            return;
        }

        setIsSubmitting(true);
        setMessage('');

       
        try {
            const appId = process.env.REACT_APP_APP_ID || 'default-app-id';
            const productsCollectionRef = collection(db, `artifacts/${appId}/public/data/products`);

            const productData = {
                name,
                description,
                price: parseFloat(price),
                category,
                status,
                sellerId: userId,
                imageUrl: imageUrl, // Use the imageUrl directly from the input field
                timestamp: new Date().toISOString(),
            };

            if (productToEdit) {
                const productDocRef = doc(db, `artifacts/${appId}/public/data/products`, productToEdit.id);
                await updateDoc(productDocRef, productData);
                setMessage('Product updated successfully!');
            } else {
                await addDoc(productsCollectionRef, productData);
                setMessage('Product added successfully!');
            }

            // Clear form
            setName('');
            setDescription('');
            setPrice('');
            setCategory('Cycles');
            setStatus('available');
            setImageUrl(''); // Clear image URL input after submission
            // Removed: setImageFile(null);
            // Removed: setUploadProgress(0);
            // Removed: setIsUploading(false);

            onProductAddedOrUpdated();
            onNavigate('home');
        } catch (error) {
            console.error("Error saving product:", error);
            setMessage(`Failed to save product: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-2xl bg-white rounded-lg shadow-xl">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">{productToEdit ? 'Edit Product' : 'Sell Your Product'}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
                    <input
                        type="text"
                        id="name"
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        id="description"
                        rows="4"
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (₹)</label>
                    <input
                        type="number"
                        id="price"
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        min="0"
                        step="0.01"
                    />
                </div>
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                        id="category"
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                {/* Status selection */}
                <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                        id="status"
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                    >
                        {statuses.map(s => (
                            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                        ))}
                    </select>
                </div>
                {/* Image URL Input Section (Reverted from file upload) */}
                <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL (Optional)</label>
                    <input
                        type="url"
                        id="imageUrl"
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="e.g., https://example.com/image.jpg"
                    />
                    {imageUrl && (
                        <div className="mt-4">
                            <img src={imageUrl} alt="Preview" className="max-w-xs h-auto rounded-md shadow-md" onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/150x100/e0e7ff/3f51b5?text=Invalid+URL"; }} />
                        </div>
                    )}
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting} // Removed isUploading from disabled state
                >
                    {isSubmitting ? (productToEdit ? 'Updating...' : 'Adding...') : (productToEdit ? 'Update Product' : 'Add Product')}
                </button>
                {message && (
                    <p className={`mt-4 text-center ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
                        {message}
                    </p>
                )}
            </form>
        </div>
    );
};

export default SellProductForm;
