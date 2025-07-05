import React, { useState } from 'react'; // Corrected: added 'from'
import { useFirebase } from '../../firebase/FirebaseContext'; // Adjust path

const LoginScreen = ({ onSwitchToSignup }) => {
    const { signInWithEmail } = useFirebase();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await signInWithEmail(email, password);
            // If successful, FirebaseContext's onAuthStateChanged will update userId
            // and MainAppContent will automatically switch to the main app view.
        } catch (err) {
            console.error("Login failed:", err);
            // Firebase error codes provide more specific messages
            let errorMessage = "Failed to sign in. Please check your credentials.";
            if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
                errorMessage = "Invalid email or password.";
            } else if (err.code === 'auth/invalid-email') {
                errorMessage = "Please enter a valid email address.";
            }
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 p-4">
            <div className="bg-white rounded-xl shadow-2xl p-8 sm:p-10 text-center max-w-md w-full transform transition-all duration-300 hover:scale-105">
                <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Welcome to IITG Marketplace</h2>
                <p className="text-lg text-gray-600 mb-8">Sign in to buy and sell products.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {loading ? (
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                    {error && <p className="text-red-600 mt-4 text-sm">{error}</p>}
                </form>

                <p className="mt-6 text-gray-600">
                    Don't have an account?{' '}
                    <button onClick={onSwitchToSignup} className="text-blue-700 hover:underline font-semibold">
                        Sign Up
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginScreen;
