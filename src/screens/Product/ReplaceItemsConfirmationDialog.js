import { useContext, useEffect, useState } from 'react';
import ConfirmationDialog from '../../components/common/ConfirmationDialog';
import CartContext from '../../context/CartContext';

function ReplaceItemsConfirmationDialog({ productVariantId, adminId }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { showWarning, setShowWarning, clearExistingAddNewItems } =
    useContext(CartContext);

  useEffect(() => {
    if (showWarning) {
      setDialogOpen(true);
    }
  }, [showWarning]);

  const handleConfirm = () => {
    setShowWarning(false);
    clearExistingAddNewItems(productVariantId, adminId);
    setDialogOpen(false);
  };

  const handleCancel = () => {
    // Close the dialog on "Cancel"
    setShowWarning(false);
    setDialogOpen(false);
  };

  return (
    <ConfirmationDialog
      open={dialogOpen}
      title="Replace cart items?"
      message="Your cart contains items from a different seller, Do you want to discard the old items and add items from this seller?"
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  );
}

export default ReplaceItemsConfirmationDialog;
