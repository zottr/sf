import React from 'react';
import {
  Box,
  Collapse,
  Divider,
  Drawer,
  Grid,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { Link as RouterLink } from 'react-router-dom';
import SearchScreen from '../../screens/SearchScreen';
import { useTranslation } from 'react-i18next';
import CustomAppBar from '../AppBar/CustomAppBar';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import HomeIcon from '@mui/icons-material/Home';
import EditNoteIcon from '@mui/icons-material/EditNote';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CategoryIcon from '@mui/icons-material/Category';
import EngineeringIcon from '@mui/icons-material/Engineering';
import GroupIcon from '@mui/icons-material/Group';
import CollectionsContext from '../../context/CollectionsContext';
import { useNavigate } from 'react-router-dom';
import PWAInstallButton from './PWAInstallButton';

function MainHeader() {
  const { t } = useTranslation();
  const theme = useTheme();
  const { collections } = React.useContext(CollectionsContext);

  const [search, setSearch] = React.useState(false);
  const [openLeftDrawer, setOpenLeftDrawer] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [expandCollections, setExpandCollections] = React.useState(false);
  const navigate = useNavigate();

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

  const handleLinkClick = (link) => {
    setOpenLeftDrawer(false);
    handleMenuClose();
    setExpandCollections(false);
    navigate(link);
  };

  const leftDrawerList = (
    <Box role="presentation">
      <List>
        <ListItemButton
          onClick={() => {
            handleLinkClick(`/`);
          }}
        >
          <ListItemIcon>
            <HomeIcon
              fontSize="medium"
              sx={{ color: theme.palette.grey[800] }}
            />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="button1"
                sx={{ color: theme.palette.grey[800] }}
              >
                Home
              </Typography>
            }
          />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            handleLinkClick(`/order-history`);
          }}
        >
          <ListItemIcon>
            <EditNoteIcon
              fontSize="medium"
              sx={{ color: theme.palette.grey[800] }}
            />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="button1"
                sx={{ color: theme.palette.grey[800] }}
              >
                Orders
              </Typography>
            }
          />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            handleLinkClick(`/favourites`);
          }}
        >
          <ListItemIcon>
            <FavoriteBorderIcon
              fontSize="medium"
              sx={{ color: theme.palette.grey[800] }}
            />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="button1"
                sx={{ color: theme.palette.grey[800] }}
              >
                Favourites
              </Typography>
            }
          />
        </ListItemButton>
      </List>
      <Divider />
      <List>
        <ListItemButton
          onClick={() => {
            setExpandCollections(!expandCollections);
          }}
        >
          <ListItemIcon>
            <CategoryIcon
              fontSize="medium"
              sx={{ color: theme.palette.grey[800] }}
            />
          </ListItemIcon>
          <ListItemText
            primary={
              <>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    // justifyContent: 'space-around',
                  }}
                >
                  <Typography
                    variant="button1"
                    sx={{ color: theme.palette.grey[800] }}
                  >
                    Collections
                  </Typography>
                  {expandCollections ? (
                    <ExpandLessIcon
                      fontSize="small"
                      sx={{ color: theme.palette.grey[800], pl: 0.5 }}
                    />
                  ) : (
                    <ExpandMoreIcon
                      fontSize="small"
                      sx={{ color: theme.palette.grey[800], pl: 0.5 }}
                    />
                  )}
                </Box>
              </>
            }
          />
        </ListItemButton>
        <Collapse in={expandCollections} timeout="auto" unmountOnExit>
          <List>
            {collections?.map((c) => (
              <ListItemButton
                key={c.slug}
                sx={{ pl: 4 }}
                onClick={() => {
                  handleLinkClick(`/collection/${c.slug}`);
                }}
              >
                <ListItemText
                  primary={
                    <Typography
                      variant="button1"
                      sx={{
                        color: theme.palette.grey[800],
                        //avoid data spilling
                        wordWrap: 'break-word', // Ensures long words break and wrap onto the next line
                        whiteSpace: 'normal', // Allows the text to wrap within the container
                        width: '100%', // Ensure the text takes up the full width of its container
                        //name shouldn't extend more than 1 line
                        display: 'block',
                        maxHeight: '1.25em', //max 1 line
                        overflow: 'hidden',
                      }}
                    >
                      {c.name}
                    </Typography>
                  }
                />
                {/* <ChevronRightIcon
                  fontSize="small"
                  sx={{ color: theme.palette.grey[800] }}
                /> */}
              </ListItemButton>
            ))}
          </List>
        </Collapse>
        <ListItemButton>
          <ListItemIcon>
            <EngineeringIcon
              fontSize="small"
              sx={{ color: theme.palette.grey[800] }}
            />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="button1"
                sx={{ color: theme.palette.grey[800] }}
              >
                Services
              </Typography>
            }
          />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            handleLinkClick(`/sellers`);
          }}
        >
          <ListItemIcon>
            <GroupIcon
              fontSize="medium"
              sx={{ color: theme.palette.grey[800] }}
            />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="button1"
                sx={{ color: theme.palette.grey[800] }}
              >
                Sellers
              </Typography>
            }
          />
        </ListItemButton>
        <ListItem>
          <PWAInstallButton />
        </ListItem>
      </List>
      <Grid
        container
        rowSpacing={1}
        sx={{
          width: '100%',
          mt: '80px',
          mb: '20px',
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Typography variant="heavyb2" sx={{ color: theme.palette.grey[600] }}>
            About Zottr
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Typography variant="b2" sx={{ color: theme.palette.grey[600] }}>
            Terms & Conditions
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Typography variant="b2" sx={{ color: theme.palette.grey[600] }}>
            Privacy Policy
          </Typography>
        </Grid>
      </Grid>
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
          to="/order-history"
          onClick={handleMenuClose}
        >
          Orders
        </MenuItem>
        <MenuItem
          component={RouterLink}
          to="/favourites"
          onClick={handleMenuClose}
        >
          Favorites
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
