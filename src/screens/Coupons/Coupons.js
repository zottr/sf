import { Grid, useTheme } from '@mui/material';

function Coupons() {
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
        <p>Coupons</p>
      </div>
    </>
  );
}
export default Coupons;
