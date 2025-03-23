import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import UserIcon from '@mui/icons-material/PersonOutlined';
import LocalMallIcon from '@mui/icons-material/LocalMallOutlined';
import { Badge, Box, Stack, useTheme } from '@mui/material';
import LogoRed from '../../assets/logos/LogoOrange.png';
import { Link } from 'react-router-dom';
import CartContext from '../../context/CartContext';

const CustomAppBar = ({ onMenuClick, onSearchClick, onUserClick }) => {
  const theme = useTheme();
  const { cartQuantity } = React.useContext(CartContext);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: theme.palette.common.white,
        color: theme.palette.common.black,
        marginBottom: '20px',
      }}
    >
      <Toolbar>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ width: '100%' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Hamburger Menu */}
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={onMenuClick}
            >
              <MenuIcon />
            </IconButton>
            {/* Logo */}
            <Link to="/">
              <img src={LogoRed} alt="Logo" style={{ height: '80px' }} />
            </Link>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Search Icon */}
            <IconButton color="inherit" onClick={onSearchClick}>
              <SearchIcon />
            </IconButton>
            {/* User Icon */}
            <IconButton color="inherit" onClick={onUserClick}>
              <UserIcon />
            </IconButton>
            {/* Shopping Bag Icon */}
            <IconButton color="inherit" component={Link} to="/cart">
              <Badge badgeContent={cartQuantity} color="error">
                <LocalMallIcon />
              </Badge>
            </IconButton>
          </Box>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
