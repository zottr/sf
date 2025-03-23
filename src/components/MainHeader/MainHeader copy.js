import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Drawer,
  Link,
  ListItemText,
  Menu,
  MenuItem,
  styled,
} from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

import { Link as RouterLink } from 'react-router-dom';

import SearchScreen from '../../screens/SearchScreen';
import { useTranslation } from 'react-i18next';
import CustomAppBar from '../AppBar/CustomAppBar';
import { ExpandMore } from '@mui/icons-material';
import CollectionList from '../CollectionsDrawerNavigationList/CollectionsDrawerNavigationList';

const CustomListItemText = styled(ListItemText)(({ theme }) => ({
  '& .MuiTypography-root': {
    color: theme.palette.common.black,
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: theme.typography.h6.fontSize,
    backgroundColor: '#FFE5B4',
  },
}));

function MainHeader() {
  const { t } = useTranslation();

  const [search, setSearch] = React.useState(false);
  const [openLeftDrawer, setOpenLeftDrawer] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [expanded, setExpanded] = React.useState(false);

  const handleAccordionToggle = () => {
    setExpanded((prev) => !prev);
  };

  const handleMenuClick = () => {
    setOpenLeftDrawer(true);
  };

  const handleSearchClick = () => {
    setSearch(true);
  };

  const toggleLeftDrawer = (toggle) => () => {
    setOpenLeftDrawer(toggle);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLinkClick = () => {
    setOpenLeftDrawer(false);
    setExpanded(false);
    handleMenuClose();
  };

  const leftDrawerList = (
    <Box
      role="presentation"
      sx={{ backgroundColor: '#FFE5B4', height: '100%' }}
    >
      <List>
        <Link
          component={RouterLink}
          to={'/'}
          sx={{ textDecoration: 'none' }}
          onClick={handleLinkClick}
        >
          <ListItem>
            <ListItemButton>
              <CustomListItemText primary={t('Home')} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Accordion
          expanded={expanded}
          onChange={handleAccordionToggle}
          sx={{ boxShadow: 'none', backgroundColor: 'inherit' }}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            sx={{ backgroundColor: 'inherit' }}
          >
            <ListItemButton>
              <CustomListItemText primary="Collections" />
            </ListItemButton>
          </AccordionSummary>
          <AccordionDetails>
            <CollectionList handleLinkClick={handleLinkClick} />
          </AccordionDetails>
        </Accordion>
        <Link
          component={RouterLink}
          to={'/sellers'}
          sx={{ textDecoration: 'none' }}
          onClick={handleLinkClick}
        >
          <ListItem>
            <ListItemButton>
              <CustomListItemText primary={'Our Sellers'} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link
          component={RouterLink}
          to={'/sellers'}
          sx={{ textDecoration: 'none' }}
          onClick={handleLinkClick}
        >
          <ListItem>
            <ListItemButton>
              <CustomListItemText primary={'About Us'} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link
          component={RouterLink}
          to={'/terms-and-policy'}
          sx={{ textDecoration: 'none' }}
          onClick={handleLinkClick}
        >
          <ListItem>
            <ListItemButton>
              <CustomListItemText primary={'Terms & Policy'} />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
      <Divider sx={{ borderStyle: 'dashed' }} />
      <List>
        <Link
          component={RouterLink}
          to={'/favourites'}
          sx={{ textDecoration: 'none' }}
          onClick={handleLinkClick}
        >
          <ListItem>
            <ListItemButton>
              <CustomListItemText primary={'Favourite Sellers'} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link
          component={RouterLink}
          to={'/order-history'}
          sx={{ textDecoration: 'none' }}
          onClick={handleLinkClick}
        >
          <ListItem>
            <ListItemButton>
              <CustomListItemText primary={t('OrderHistory')} />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </Box>
  );

  return (
    <>
      <CustomAppBar
        onMenuClick={handleMenuClick}
        onUserClick={handleMenuOpen}
        onSearchClick={handleSearchClick}
      />

      <Drawer
        open={openLeftDrawer}
        onClose={toggleLeftDrawer(false)}
        sx={{
          width: '200px',
          zIndex: (theme) => theme.zIndex.drawer,
        }}
      >
        {leftDrawerList}
      </Drawer>

      {/* User Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        MenuListProps={{
          sx: {
            bgcolor: 'white', // Background color for the entire menu
            color: 'black', // Text color for all menu items
          },
        }}
      >
        <MenuItem
          component={RouterLink}
          to="/profile"
          onClick={handleMenuClose}
        >
          Profile
        </MenuItem>
        <MenuItem
          component={RouterLink}
          to="/favourites"
          onClick={handleMenuClose}
        >
          Favorite Sellers
        </MenuItem>
        <MenuItem component={RouterLink} to="/logout" onClick={handleMenuClose}>
          Logout
        </MenuItem>
      </Menu>

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
