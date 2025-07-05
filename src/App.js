import React from 'react';
import { FirebaseProvider } from './firebase/FirebaseContext';
import MainAppContent from './MainAppContent';

const App = () => {
    return (
        <FirebaseProvider>
            <MainAppContent />
        </FirebaseProvider>
    );
};

export default App;
