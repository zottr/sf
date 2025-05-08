import { Button, Snackbar, IconButton, Typography } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import ReplyIcon from '@mui/icons-material/Reply';
import { stripHtml } from '../../utils/CommonUtils';

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
      <Button
        onClick={handleShare}
        variant="outlined"
        sx={{
          height: '3rem',
          borderColor: 'secondary.dark',
          borderRadius: '30px',
          '&:hover, &:focus, &:active': {
            borderColor: 'secondary.dark',
          },
        }}
      >
        <Typography variant="button1" sx={{ color: 'secondary.dark' }}>
          Share
        </Typography>
        <ReplyIcon
          fontSize="medium"
          sx={{ transform: 'scaleX(-1)', ml: 1, color: 'secondary.dark' }}
        />
      </Button>
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
