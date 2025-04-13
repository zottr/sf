import { Button, Snackbar, IconButton } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { stripHtml } from '../../Utils/utils';

const ShareButton = ({ title, text, url }) => {
  const [toastOpen, setToastOpen] = useState(false);

  const handleShare = async () => {
    const message = `${stripHtml(text)}\n\n${url}`;
    if (navigator.share) {
      try {
        await navigator.share({ text: message });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setToastOpen(true); // Show toast notification
      } catch (error) {
        console.error('Failed to copy:', error);
      }
    }
  };

  return (
    <>
      <IconButton size="large" onClick={handleShare} sx={{ color: '#1976d2' }}>
        <ShareIcon />
      </IconButton>
      {/* Snackbar for toast message */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={3000} // Closes after 3 seconds
        onClose={() => setToastOpen(false)}
        message="Link copied to clipboard!"
        action={
          <IconButton
            size="small"
            color="inherit"
            onClick={() => setToastOpen(false)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </>
  );
};

export default ShareButton;
