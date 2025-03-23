import { Grid, useTheme } from '@mui/material';

function UserProfile() {
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
        <p>User Profile</p>
      </div>
    </>
  );
}
export default UserProfile;
