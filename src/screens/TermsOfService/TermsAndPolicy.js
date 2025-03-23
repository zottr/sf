import { Grid, useTheme } from '@mui/material';

function TermsAndPolicy() {
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
        <p>Terms & Policy</p>
      </div>
    </>
  );
}
export default TermsAndPolicy;
