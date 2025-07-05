import React, { useState, useEffect } from 'react';
import { onSnapshot, collection, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useFirebase } from './firebase/FirebaseContext';

import Header from './components/Header';
import ProductList from './components/ProductList';
import SellProductForm from './components/SellProductForm';
import MyProducts from './components/MyProducts';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import ProductDetailPage from './components/ProductDetailPage';
import LoginScreen from './components/Auth/LoginScreen';
import SignupScreen from './components/Auth/SignupScreen';
import ProfileScreen from './components/ProfileScreen'; // Import ProfileScreen

const MainAppContent = () => {
    const [currentPage, setCurrentPage] = useState('home');
    const [products, setProducts] = useState([]);
    const [productToEdit, setProductToEdit] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [productToDeleteId, setProductToDeleteId] = useState(null);
    const [isLoginView, setIsLoginView] = useState(true);

    const { db, auth, userId, userProfile, isAuthReady } = useFirebase(); // Get userProfile from context

    // Fetch products from Firestore
    useEffect(() => {
        if (!db || !isAuthReady || !userId) {
            console.log("Firestore not ready, auth not checked yet, or user not logged in. Clearing products.");
            setProducts([]);
            return;
        }

        const appId = process.env.REACT_APP_APP_ID || 'default-app-id';
        const productsCollectionRef = collection(db, `artifacts/${appId}/public/data/products`);

        const unsubscribe = onSnapshot(productsCollectionRef, (snapshot) => {
            const productsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            productsData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            setProducts(productsData);
            console.log("Products fetched:", productsData);
        }, (error) => {
            console.error("Error fetching products:", error);
        });

        return () => unsubscribe();
    }, [db, isAuthReady, userId]);

    const handleSignOut = async () => {
        if (auth) {
            try {
                await signOut(auth);
                setCurrentPage('home');
                setSelectedProduct(null);
                setIsLoginView(true);
                console.log("User signed out.");
            } catch (error) {
                console.error("Error signing out:", error);
            }
        }
    };

    const handleNavigate = (page, product = null) => {
        setCurrentPage(page);
        setProductToEdit(null);
        setSelectedProduct(null);

        if (page === 'sell' && product) {
            setProductToEdit(product);
        }
    };

    const handleViewProductDetails = (product) => {
        setSelectedProduct(product);
        setCurrentPage('product-detail');
    };

    const handleBackToProducts = () => {
        setSelectedProduct(null);
        setCurrentPage('home');
    };

    const handleBackToHomeFromProfile = () => { // New function for back button on profile
        setCurrentPage('home');
    };

    const handleEditProduct = (product) => {
        handleNavigate('sell', product);
    };

    const handleDeleteProduct = (productId) => {
        setProductToDeleteId(productId);
        setShowDeleteConfirm(true);
    };

    const confirmDelete = async () => {
        if (!db || !productToDeleteId) return;

        try {
            const appId = process.env.REACT_APP_APP_ID || 'default-app-id';
            const productDocRef = doc(db, `artifacts/${appId}/public/data/products`, productToDeleteId);
            await deleteDoc(productDocRef);
            console.log("Product deleted successfully:", productToDeleteId);
        } catch (error) {
            console.error("Error deleting product:", error);
        } finally {
            setShowDeleteConfirm(false);
            setProductToDeleteId(null);
        }
    };

    const cancelDelete = () => {
        setShowDeleteConfirm(false);
        setProductToDeleteId(null);
    };

    const handleToggleProductStatus = async (productId, currentStatus) => {
        if (!db || !userId) {
            console.error("Database not ready or user not authenticated.");
            return;
        }

        const newStatus = currentStatus === 'available' ? 'sold' : 'available';
        const appId = process.env.REACT_APP_APP_ID || 'default-app-id';
        const productDocRef = doc(db, `artifacts/${appId}/public/data/products`, productId);

        try {
            await updateDoc(productDocRef, { status: newStatus });
            console.log(`Product ${productId} status toggled to ${newStatus}`);
        } catch (error) {
            console.error("Error toggling product status:", error);
            alert(`Failed to update status: ${error.message}`);
        }
    };

    const handleProductAddedOrUpdated = () => {
        console.log("Product added or updated, UI should refresh automatically.");
    };

    // Conditional rendering based on authentication status
    if (!isAuthReady) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="text-xl font-semibold text-gray-700">Loading authentication...</div>
            </div>
        );
    }

    if (!userId) { // If user is not logged in, show login/signup screen
        return isLoginView ? (
            <LoginScreen onSwitchToSignup={() => setIsLoginView(false)} />
        ) : (
            <SignupScreen onSwitchToLogin={() => setIsLoginView(true)} />
        );
    }

    // If user is logged in, render the main app content
    return (
        <div className="min-h-screen bg-gray-100 font-inter antialiased">
            <Header onNavigate={handleNavigate} currentUserId={userId} onSignOut={handleSignOut} userProfile={userProfile} /> {/* Pass userProfile */}
            <main className="py-8">
                {(() => {
                    if (currentPage === 'product-detail' && selectedProduct) {
                        return <ProductDetailPage product={selectedProduct} onBack={handleBackToProducts} />;
                    }
                    if (currentPage === 'my-profile') { // New case for ProfileScreen
                        return <ProfileScreen onBack={handleBackToHomeFromProfile} />;
                    }

                    switch (currentPage) {
                        case 'home':
                            return (
                                <ProductList
                                    onNavigate={handleNavigate}
                                    products={products}
                                    userId={userId}
                                    onEditProduct={handleEditProduct}
                                    onDeleteProduct={handleDeleteProduct}
                                    onViewDetails={handleViewProductDetails}
                                />
                            );
                        case 'sell':
                            return (
                                <SellProductForm
                                    onNavigate={handleNavigate}
                                    productToEdit={productToEdit}
                                    onProductAddedOrUpdated={handleProductAddedOrUpdated}
                                />
                            );
                        case 'my-products':
                            return (
                                <MyProducts
                                    onNavigate={handleNavigate}
                                    products={products}
                                    userId={userId}
                                    onEditProduct={handleEditProduct}
                                    onDeleteProduct={handleDeleteProduct}
                                    onToggleProductStatus={handleToggleProductStatus}
                                />
                            );
                        default:
                            return (
                                <ProductList
                                    onNavigate={handleNavigate}
                                    products={products}
                                    userId={userId}
                                    onEditProduct={handleEditProduct}
                                    onDeleteProduct={handleDeleteProduct}
                                    onViewDetails={handleViewProductDetails}
                                />
                            );
                    }
                })()}
            </main>

            <DeleteConfirmationModal
                show={showDeleteConfirm}
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
            />
        </div>
    );
};

export default MainAppContent;
