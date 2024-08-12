import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import { auth } from './firebase';
import SignIn from './components/SignIn';
import NavBar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [user, setUser] = React.useState(null);
  const [deferredPrompt, setDeferredPrompt] = React.useState(null);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  React.useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        setDeferredPrompt(null);
      });
    }
  };

  return (
    <Router>
      <NavBar deferredPrompt={deferredPrompt} handleInstallClick={handleInstallClick}/>
      <Routes>
        <Route path="/SignIn" element={user ? <Navigate to="/dashboard" /> : <SignIn />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/SignIn" />} />
        <Route path="/" element={<Navigate to="/SignIn" />} />
      </Routes>
      {deferredPrompt && (
        <button 
          onClick={handleInstallClick} 
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: 'violet',
            color: 'white',
            borderRadius: '50px',
            padding: '10px 20px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            fontSize: '16px',
            cursor: 'pointer',
            border: 'none',
            zIndex: 1000,
            transition: 'transform 0.2s ease-in-out',
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          Install App
        </button>
      )}
      <Footer />
    </Router>
  );
}

export default App;
