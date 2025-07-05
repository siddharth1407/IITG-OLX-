import React, { useState, useEffect } from 'react';
import { useFirebase } from '../firebase/FirebaseContext'; // Adjust path

const ProfileScreen = ({ onBack }) => {
    const { userId, userProfile, createUserProfile } = useFirebase();
    const [name, setName] = useState('');
    const [hostel, setHostel] = useState('');
    const [department, setDepartment] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [bio, setBio] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (userProfile) {
            setName(userProfile.name || '');
            setHostel(userProfile.hostel || '');
            setDepartment(userProfile.department || '');
            setContactPhone(userProfile.contactPhone || '');
            setBio(userProfile.bio || '');
        }
    }, [userProfile]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        if (!userId) {
            setMessage('Error: User not authenticated.');
            setLoading(false);
            return;
        }

        const updatedProfile = {
            name,
            hostel,
            department,
            contactPhone,
            bio,
            email: userProfile?.email || '', // Ensure email is retained or added
            updatedAt: new Date().toISOString()
        };

        try {
            await createUserProfile(userId, updatedProfile); // Use createUserProfile to update
            setMessage('Profile updated successfully!');
        } catch (error) {
            console.error("Error updating profile:", error);
            setMessage(`Failed to update profile: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-2xl bg-white rounded-lg shadow-xl">
            <button
                onClick={onBack}
                className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition duration-200"
            >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                Back to Home
            </button>

            <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">My Profile</h2>

            {userProfile ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
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
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
                            value={userProfile.email || ''}
                            readOnly // Email is read-only as it's from Firebase Auth
                        />
                    </div>
                    <div>
                        <label htmlFor="hostel" className="block text-sm font-medium text-gray-700">Hostel</label>
                        <input
                            type="text"
                            id="hostel"
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={hostel}
                            onChange={(e) => setHostel(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
                        <input
                            type="text"
                            id="department"
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700">Contact Phone</label>
                        <input
                            type="tel"
                            id="contactPhone"
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={contactPhone}
                            onChange={(e) => setContactPhone(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                        <textarea
                            id="bio"
                            rows="3"
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Saving...' : 'Save Profile'}
                    </button>
                    {message && (
                        <p className={`mt-4 text-center ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
                            {message}
                        </p>
                    )}
                </form>
            ) : (
                <p className="text-center text-gray-600">Loading profile...</p>
            )}
        </div>
    );
};

export default ProfileScreen;
