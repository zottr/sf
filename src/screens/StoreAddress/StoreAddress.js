import { Grid, useTheme } from '@mui/material';

function StoreAddress() {
  const theme = useTheme();
  return (
    <>
      <div
        style={{
          backgroundColor: theme.palette.grey[200],
          scrollBehavior: 'smooth',
        }}
      >
        <Grid container></Grid>
        <p>--------------</p>
        <p>Store Address</p>
      </div>
    </>
  );
}
export default StoreAddress;
