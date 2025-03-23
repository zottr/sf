import { Grid, useTheme } from '@mui/material';

function AboutUs() {
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
        <p>About Us</p>
      </div>
    </>
  );
}
export default AboutUs;
