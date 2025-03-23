import React from 'react';
import {
  AppBar,
  Box,
  Button,
  Drawer,
  Grid,
  Stack,
  Toolbar,
  useTheme,
} from '@mui/material';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { Link } from 'react-router-dom';

//icons
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import MenuIcon from '@mui/icons-material/Menu';

import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { Link as RouterLink } from 'react-router-dom';

import SearchScreen from '../screens/SearchScreen';

function MainHeader() {
  const [search, setSearch] = React.useState(false);
  const theme = useTheme();

  const [openLeftDrawer, setOpenLeftDrawer] = React.useState(false);
  const toggleLeftDrawer = (open) => () => {
    setOpenLeftDrawer(open);
  };

  const leftDrawerList = (
    <Box
      sx={{ width: '200px' }}
      role="presentation"
      onClick={toggleLeftDrawer(false)}
    >
      <List>
        <RouterLink to={'/'} sx={{ textDecoration: 'none' }}>
          <ListItem>
            <ListItemButton>
              <ListItemText
                primary={'Home'}
                primaryTypographyProps={{
                  color: 'black',
                  variant: 'subtitle1',
                  fontWeight: '500',
                }}
              />
            </ListItemButton>
          </ListItem>
        </RouterLink>
        <RouterLink to={'/order-history'} sx={{ textDecoration: 'none' }}>
          <ListItem>
            <ListItemButton>
              <ListItemText
                primary={'Order History'}
                primaryTypographyProps={{
                  color: 'black',
                  variant: 'subtitle1',
                  fontWeight: '500',
                }}
              />
            </ListItemButton>
          </ListItem>
        </RouterLink>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        elevation={1}
        position="fixed"
        sx={{
          height: '50px',
          width: '100%',
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Toolbar
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: theme.palette.primary.main,
          }}
        >
          <Button onClick={toggleLeftDrawer(true)} sx={{ marginLeft: -2 }}>
            <MenuIcon sx={{ color: 'white', fontSize: '30px' }} />
          </Button>
          <Box sx={{ marginRight: 4 }}>
            <Button
              sx={{
                marginRight: -2,
              }}
              onClick={() => {
                setSearch(true);
              }}
            >
              <SearchIcon
                sx={{
                  color: 'white',
                  fontSize: '30px',
                }}
              />
            </Button>
            <Button
              sx={{ marginRight: -2 }}
              onClick={() => {
                setSearch(true);
              }}
            >
              <FavoriteBorderIcon
                sx={{
                  color: 'white',
                  fontSize: '30px',
                }}
              />
            </Button>
            <Button component={Link} to="/cart" sx={{ marginRight: -2 }}>
              <ShoppingCartIcon
                sx={{
                  color: 'white',
                  fontSize: '30px',
                }}
              />
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        open={openLeftDrawer}
        onClose={toggleLeftDrawer(false)}
        PaperProps={{
          sx: {},
        }}
      >
        {leftDrawerList}
      </Drawer>
      <SearchScreen
        open={search}
        close={() => {
          setSearch(false);
        }}
      />
    </>
  );
}

export default MainHeader;
