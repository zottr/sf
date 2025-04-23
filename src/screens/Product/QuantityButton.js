import {
  Button,
  Typography,
  Box,
  useTheme,
  Grid,
  CircularProgress,
} from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function QuantityButton({
  quantity,
  addToCart,
  removeFromCart,
  buttonHeight,
  buttonSize,
  labelVariant,
  itemId = '',
  itemBeingModifiedId = '',
}) {
  const theme = useTheme();
  let buttonSx = { height: buttonHeight };

  const isItemBeingModified = itemId !== '' && itemId === itemBeingModifiedId;

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          border: '2px solid',
          // borderColor: theme.palette.grey[800],
          borderColor: 'primary.dark',
          borderRadius: '25px',
          width: '100%',
          ...buttonSx,
        }}
      >
        <Grid container>
          <Grid
            item
            xs={4}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button onClick={removeFromCart}>
              <RemoveIcon
                sx={{ color: theme.palette.grey[900] }}
                fontSize={buttonSize}
              />
            </Button>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {isItemBeingModified && (
              <Box
                sx={{
                  height: buttonHeight,
                  width: buttonHeight,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                <CircularProgress
                  variant="indeterminate"
                  thickness={7}
                  size="70%"
                  sx={{
                    position: 'absolute',
                    transform: 'translate(-50%, -50%)', // ensures it's perfectly centered
                    color: theme.palette.grey[700],
                  }}
                />
              </Box>
            )}
            {!isItemBeingModified && (
              <Typography
                color={theme.palette.grey[900]}
                variant={labelVariant}
                sx={{
                  textAlign: 'center',
                }}
              >
                {quantity}
              </Typography>
            )}
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button onClick={addToCart}>
              <AddIcon
                sx={{ color: theme.palette.grey[900] }}
                fontSize={buttonSize}
              />
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default QuantityButton;
