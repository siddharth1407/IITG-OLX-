import React from 'react';

const Header = ({ onNavigate, currentUserId, onSignOut, userProfile }) => { // Added userProfile prop
    const displayName = userProfile?.name || currentUserId; // Prefer name, fallback to ID

    return (
        <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 shadow-lg rounded-b-lg">
            <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
                <h1 className="text-3xl font-extrabold mb-2 sm:mb-0">IITG Marketplace</h1>
                <nav className="flex flex-wrap gap-4">
                    <button onClick={() => onNavigate('home')} className="nav-button">Buy</button>
                    <button onClick={() => onNavigate('sell')} className="nav-button">Sell</button>
                    {currentUserId && (
                        <>
                            <button onClick={() => onNavigate('my-products')} className="nav-button">My Products</button>
                            <button onClick={() => onNavigate('my-profile')} className="nav-button">My Profile</button> {/* New Profile Button */}
                        </>
                    )}
                    {currentUserId && (
                        <span className="text-sm bg-blue-800 px-3 py-1 rounded-full flex items-center">
                            Welcome, <span className="font-semibold ml-1">{displayName}</span>
                        </span>
                    )}
                    <button onClick={onSignOut} className="nav-button bg-red-500 hover:bg-red-600">Sign Out</button>
                </nav>
            </div>
        </header>
    );
};

export default Header;
