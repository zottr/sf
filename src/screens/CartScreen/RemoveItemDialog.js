import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import React from 'react';

function RemoveItemDialog({ open, item, handleItem }) {
  return (
    <>
      <Dialog open={open}>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Remove '{item?.productVariant?.name}' from cart ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleItem(item, true);
            }}
          >
            Yes
          </Button>
          <Button
            onClick={() => {
              handleItem(item, false);
            }}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default RemoveItemDialog;
