import { useContext, useEffect, useState } from 'react';
import ConfirmationDialog from '../../components/shared/ConfirmationDialog';
import CartContext from '../../context/CartContext';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';

function ReplaceItemsConfirmationDialog({
  productVariantId,
  newSellerId,
  newSellerName,
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const {
    showWarningVariantId,
    setShowWarningVariantId,
    clearExistingAddNewItems,
    currentSellerName,
    itemBeingAddedVariantId,
  } = useContext(CartContext);

  useEffect(() => {
    console.log('hii');
    if (showWarningVariantId === productVariantId) {
      setDialogOpen(true);
    }
  }, [showWarningVariantId]);

  const handleConfirm = () => {
    setShowWarningVariantId('');
    clearExistingAddNewItems(productVariantId, newSellerId, newSellerName);
    setDialogOpen(false);
  };

  const handleCancel = () => {
    // Close the dialog on "Cancel"
    setShowWarningVariantId('');
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onClose={handleCancel}>
      <DialogTitle color="black">
        <Typography variant="h6" sx={{ color: 'grey.900' }}>
          Replace cart items?
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography variant="b1" sx={{ color: 'grey.800' }}>
            {`Your cart has items from `}
            <Typography
              variant="h8"
              component="span"
              sx={{ color: 'grey.800' }}
            >
              {currentSellerName}
            </Typography>
            {`. Do you want to replace them with items from `}
            <Typography
              variant="h8"
              component="span"
              sx={{ color: 'grey.800' }}
            >
              {newSellerName}
            </Typography>
            {`?`}
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>
          <Typography variant="button1" sx={{ color: 'grey.500' }}>
            Cancel
          </Typography>
        </Button>
        <Button onClick={handleConfirm}>
          <Typography variant="button1" sx={{ color: 'error.main' }}>
            Replace Items
          </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ReplaceItemsConfirmationDialog;
