import { Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

const PWAInstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      navigator.standalone;
    if (isStandalone) {
      setIsInstalled(true);
    }

    // Listen for beforeinstallprompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault(); // Prevent Chrome's mini-infobar
      setDeferredPrompt(e); // Save the event for triggering later
      console.log('beforeinstallprompt fired');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Listen for appinstalled
    const handleAppInstalled = () => {
      console.log('App installed successfully');
      setIsInstalled(true);
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isInstalled) {
      showPopup('App is already installed.');
    } else if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
        //showPopup('You dismissed the installation prompt.');
      }
      setDeferredPrompt(null);
    } else {
      // Fallback for unsupported browsers
      showPopup(
        'Your browser does not support automatic installation prompts. To add this app to your home screen, use the "Add to Home Screen" option in your browser.'
      );
    }
  };

  const showPopup = (message) => {
    setPopupMessage(message);
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleInstallClick}
        sx={{ margin: 2 }}
      >
        <Typography variant="button1">Install App </Typography>
      </Button>

      {isPopupVisible && (
        <div
          style={{
            position: 'fixed',
            top: '20%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#333',
            color: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
            textAlign: 'center',
          }}
        >
          <p>
            <Typography variant="b2">{popupMessage}</Typography>
          </p>
          <button
            onClick={closePopup}
            style={{
              marginTop: '10px',
              padding: '8px 16px',
              backgroundColor: '#007BFF',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            <Typography variant="button2">Close</Typography>
          </button>
        </div>
      )}
    </div>
  );
};

export default PWAInstallButton;
