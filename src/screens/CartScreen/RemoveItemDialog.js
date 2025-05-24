import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
} from '@mui/material';
import React from 'react';

function RemoveItemDialog({ open, item, handleItem, itemBeingRemovedId }) {
  const isItemBeingRemoved = item.id === itemBeingRemovedId;

  return (
    <>
      <Dialog open={open}>
        <DialogContent>
          {!isItemBeingRemoved && (
            <Typography variant="heavyb1" sx={{ color: 'grey.700' }}>
              Remove '{item?.productVariant?.name}' from cart?
            </Typography>
          )}
          {isItemBeingRemoved && (
            <>
              <Typography variant="heavyb1" sx={{ color: 'grey.700' }}>
                Removing '{item?.productVariant?.name}' from cart...
              </Typography>
              <Box className="flexCenter">
                <CircularProgress
                  thickness={4}
                  sx={{ color: 'primary.main' }}
                />
              </Box>
            </>
          )}
        </DialogContent>

        {!isItemBeingRemoved && (
          <DialogActions>
            <Button
              onClick={() => {
                handleItem(item, true);
              }}
            >
              <Typography variant="button1" sx={{ color: 'error.main' }}>
                Yes, remove
              </Typography>
            </Button>
            <Button
              onClick={() => {
                handleItem(item, false);
              }}
            >
              <Typography variant="button1" sx={{ color: 'grey.500' }}>
                Cancel
              </Typography>
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </>
  );
}

export default RemoveItemDialog;
