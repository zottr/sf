import { Grid, useTheme } from '@mui/material';

function Orders() {
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
        <p>Orders</p>
      </div>
    </>
  );
}
export default Orders;
