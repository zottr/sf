import React from 'react';
import { Button, Typography } from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';
import { useInstallPrompt } from '../../context/InstallPromptContext';

const PWAInstallButton = () => {
  const { deferredPrompt, isInstalled } = useInstallPrompt();

  const handleInstallClick = async () => {
    if (isInstalled) {
      alert('App is already installed.');
    } else if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
    } else {
      alert(
        'Your browser does not support automatic installation prompts. Use "Add to Home Screen/Create Shortcut" button in your browser settings and follow instructions.'
      );
    }
  };

  return (
    <Button
      onClick={handleInstallClick}
      variant="outlined"
      sx={{
        mt: 3,
        width: '100%',
        borderWidth: '0',
        backgroundColor: 'hsl(38 88.2% 98%)',
        '&:hover': {
          backgroundColor: 'hsl(38 88.2% 98%)',
          borderWidth: '0',
        },
        '&:focus': {
          backgroundColor: 'hsl(38 88.2% 98%)',
        },
        '&:active': {
          backgroundColor: 'hsl(38 88.2% 98%)',
        },
      }}
      startIcon={
        <GetAppIcon fontSize="medium" sx={{ color: 'hsl(30 , 100% , 20%)' }} />
      }
    >
      <Typography variant="button1" sx={{ color: 'hsl(30 , 100% , 20%)' }}>
        Install App
      </Typography>
    </Button>
  );
};

export default PWAInstallButton;
