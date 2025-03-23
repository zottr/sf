import { Grid, useTheme } from '@mui/material';
import MainHeader from '../components/MainHeader';
import useStyles from '../screens/Home/styles';
import CollectionsPreview from '../components/CollectionItemsPreview';
import Banners from '../components/Banners';

function Home() {
  const theme = useTheme();
  const classes = useStyles();
  //todo: add cases for loading/error as well
  return (
    <>
      <div
        style={{
          backgroundColor: theme.palette.grey[200], //todo: change
          scrollBehavior: 'smooth',
          marginTop: '20px',
        }}
      >
        <MainHeader />
        <Banners />
        <CollectionsPreview />
      </div>
    </>
  );
}
export default Home;
