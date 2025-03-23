import { Grid, useTheme } from '@mui/material';

function FAQs() {
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
        <p>FAQs</p>
      </div>
    </>
  );
}
export default FAQs;
