import React from 'react';

const DeleteConfirmationModal = ({ show, onConfirm, onCancel }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 shadow-2xl max-w-sm w-full text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Confirm Deletion</h3>
                <p className="text-gray-700 mb-6">Are you sure you want to delete this product? This action cannot be undone.</p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onConfirm}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-5 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        Delete
                    </button>
                    <button
                        onClick={onCancel}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-5 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
