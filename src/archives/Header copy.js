import React from 'react';
import { useTranslation } from 'react-i18next';
import { AppBar, Box, Button, Drawer, Stack, useTheme } from '@mui/material';

import InputBase from '@mui/material/InputBase';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled, alpha } from '@mui/material/styles';

import { Link } from 'react-router-dom';

//icons
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import DescriptionIcon from '@mui/icons-material/Description';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PolicyIcon from '@mui/icons-material/Policy';

import LoginIcon from '@mui/icons-material/Login';
import LanguageIcon from '@mui/icons-material/Language';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import PhoneIcon from '@mui/icons-material/Phone';
import MapIcon from '@mui/icons-material/Map';
import DiscountIcon from '@mui/icons-material/Discount';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
//todo: settle on a user icon
//import { ReactComponent as PersonIcon } from '../../assets/icons/user.svg';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

import { Link as RouterLink } from 'react-router-dom';

// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(1),
//     width: 'auto',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function Header() {
  // const { t } = useTranslation();

  const theme = useTheme();

  // const categories = [
  //   'Fresh Juices',
  //   'Shakes',
  //   'Slushes',
  //   'Fruit Bowls',
  //   'Gelato',
  // ];

  // const leftMenuItems = [
  //   { name: t('aboutUs'), link: '/about-us', icon: PeopleAltIcon },
  //   { name: t('FAQs'), link: '/FAQs', icon: QuestionAnswerIcon },
  //   {
  //     name: t('termsOfService'),
  //     link: '/terms-of-service',
  //     icon: DescriptionIcon,
  //   },
  //   {
  //     name: t('refundPolicy'),
  //     link: '/refund-policy',
  //     icon: CurrencyExchangeIcon,
  //   },
  //   {
  //     name: t('shippingPolicy'),
  //     link: '/shipping-policy',
  //     icon: LocalShippingIcon,
  //   },
  //   { name: t('privacyPolicy'), link: '/privacy-policy', icon: PolicyIcon },
  // ];

  const [openLeftDrawer, setOpenLeftDrawer] = React.useState(false);
  const toggleLeftDrawer = (open) => () => {
    setOpenLeftDrawer(open);
  };

  // const leftDrawerList = (
  //   <Box
  //     sx={{ width: 250 }}
  //     role="presentation"
  //     onClick={toggleLeftDrawer(false)}
  //   >
  //     <Divider>
  //       <Typography color="common.black">
  //         <strong>Browse Products</strong>
  //       </Typography>
  //     </Divider>
  //     <List>
  //       {categories.map((collection, index) => (
  //         <RouterLink
  //           to={`/collection/${collection}`}
  //           className={classes.linkDecoration}
  //         >
  //           <ListItem key={collection} disablePadding onClick={() => {}}>
  //             <ListItemButton>
  //               <ListItemIcon>
  //                 <ArrowRightIcon />
  //               </ListItemIcon>
  //               <ListItemText
  //                 primary={collection}
  //                 primaryTypographyProps={{
  //                   color: 'black',
  //                 }}
  //               />
  //             </ListItemButton>
  //           </ListItem>
  //         </RouterLink>
  //       ))}
  //     </List>
  //     <Divider />
  //     <List>
  //       {leftMenuItems.map((item, index) => (
  //         <RouterLink to={item.link} className={classes.linkDecoration}>
  //           <ListItem key={item.name} disablePadding>
  //             <ListItemButton>
  //               <ListItemIcon>
  //                 <item.icon />
  //               </ListItemIcon>
  //               <ListItemText
  //                 primary={item.name}
  //                 primaryTypographyProps={{
  //                   color: 'black',
  //                 }}
  //               />
  //             </ListItemButton>
  //           </ListItem>
  //         </RouterLink>
  //       ))}
  //     </List>
  //   </Box>
  // );

  const leftDrawerList = (
    <Box
      sx={{ width: '200px' }}
      role="presentation"
      onClick={toggleLeftDrawer(false)}
    >
      <List>
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

  // const rightMenuItems = [
  //   {
  //     name: t('loginOrRegister'),
  //     link: '/login-or-register',
  //     icon: LoginIcon,
  //   },
  //   { name: t('language'), link: '/set-language', icon: LanguageIcon },
  //   { name: t('myProfile'), link: '/user-profile', icon: AccountCircleIcon },
  //   { name: t('orders'), link: '/orders', icon: LocalMallIcon },
  //   { name: t('callStore'), link: '/call-store', icon: PhoneIcon },
  //   { name: t('storeAddress'), link: '/store-address', icon: MapIcon },
  //   { name: t('coupons'), link: '/coupons', icon: DiscountIcon },
  // ];

  // const [anchor, setAnchor] = React.useState(null);
  // const openRightMenu = (event) => {
  //   setAnchor(event.currentTarget);
  // };
  // const closeRightMenu = () => {
  //   setAnchor(null);
  // };

  return (
    <>
      <AppBar elevation={0} position="fixed">
        <Stack
          direction="row"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: theme.palette.primary.dark,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            height: '50px',
          }}
        >
          <Button onClick={toggleLeftDrawer(true)}>
            <MenuIcon fontSize="large" sx={{ color: 'white' }} />
          </Button>
          <Drawer
            open={openLeftDrawer}
            onClose={toggleLeftDrawer(false)}
            PaperProps={{
              sx: {},
            }}
          >
            {leftDrawerList}
          </Drawer>
          {/* <RouterLink to={'/'} className={classes.linkDecoration}>
          <Typography
            variant="h6"
            color={theme.palette.common.black} //todo: configure from theme file
            className={classes.font700}
            style={{
              marginRight: '15px',
              fontFamily: 'Fredoka',
              fontWeight: '400',
              color: 'brown',
            }}
          >
            {'cwikio'}
          </Typography>
        </RouterLink> */}
          <Box
            sx={{
              height: '80%',
              marginTop: '4px',
              backgroundColor: alpha(theme.palette.primary.light, 0.12),
              '&:hover': {
                backgroundColor: alpha(theme.palette.secondary.light, 0.07),
              },
              borderRadius: 2,
            }}
          >
            <SearchIcon
              fontSize="large"
              sx={{
                height: '85%',
                position: 'absolute',
                paddingLeft: '5px',
              }}
            />
            <StyledInputBase
              placeholder="search anything"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Box>
          <Link to="/cart" style={{ textDecoration: 'none' }}>
            <Button>
              <ShoppingCartIcon fontSize="large" sx={{ color: 'white' }} />
            </Button>
          </Link>
        </Stack>
      </AppBar>
    </>
  );
}

export default Header;
