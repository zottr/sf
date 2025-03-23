import { Grid, useTheme } from '@mui/material';

function LoginOrRegister() {
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
        <p>Login Or Register</p>
      </div>
    </>
  );
}
export default LoginOrRegister;
