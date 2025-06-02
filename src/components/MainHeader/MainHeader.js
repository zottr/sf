import React from 'react';
import {
  Box,
  Button,
  Collapse,
  Divider,
  Drawer,
  Grid,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
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
import FavoriteIcon from '@mui/icons-material/Favorite';
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
          sx={{ mb: 0.5 }}
        >
          <ListItemIcon>
            <HomeIcon sx={{ color: theme.palette.grey[800], fontSize: 28 }} />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="heavylabel1"
                sx={{ color: theme.palette.grey[800] }}
              >
                Home
              </Typography>
            }
          />
        </ListItemButton>
        <ListItemButton
          sx={{ mb: 0.5 }}
          onClick={() => {
            handleLinkClick(`/order-history`);
          }}
        >
          <ListItemIcon>
            <EditNoteIcon
              sx={{ color: theme.palette.grey[800], fontSize: 28 }}
            />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="heavylabel1"
                sx={{ color: theme.palette.grey[800] }}
              >
                Your Orders
              </Typography>
            }
          />
        </ListItemButton>
        <ListItemButton
          sx={{ mb: 0.5 }}
          onClick={() => {
            handleLinkClick(`/favorite-sellers`);
          }}
        >
          <ListItemIcon>
            <FavoriteIcon
              sx={{ color: theme.palette.grey[800], fontSize: 28 }}
            />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="heavylabel1"
                sx={{ color: theme.palette.grey[800] }}
              >
                Favorites
              </Typography>
            }
          />
        </ListItemButton>
      </List>
      <Divider sx={{ my: 1.5 }} />
      <List>
        <ListItemButton
          sx={{ mb: 0.5 }}
          onClick={() => {
            setExpandCollections(!expandCollections);
          }}
        >
          <ListItemIcon>
            <CategoryIcon
              sx={{ color: theme.palette.grey[800], fontSize: 28 }}
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
                    variant="heavylabel1"
                    sx={{ color: theme.palette.grey[800] }}
                  >
                    Categories
                  </Typography>
                  {expandCollections ? (
                    <ExpandLessIcon
                      sx={{
                        color: theme.palette.grey[800],
                        pl: 0.5,
                        fontSize: 28,
                      }}
                    />
                  ) : (
                    <ExpandMoreIcon
                      sx={{
                        color: theme.palette.grey[800],
                        pl: 0.5,
                        fontSize: 28,
                      }}
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
                sx={{ pl: 4, mb: 0.5 }}
                onClick={() => {
                  handleLinkClick(`/collection/${c.slug}`);
                }}
              >
                <ListItemText
                  primary={
                    <Typography
                      variant="label1"
                      sx={{
                        color: theme.palette.grey[800],
                        //avoid data spilling
                        wordWrap: 'break-word', // Ensures long words break and wrap onto the next line
                        whiteSpace: 'normal', // Allows the text to wrap within the container
                        width: '100%', // Ensure the text takes up the full width of its container
                        //name shouldn't extend more than 1 line
                        display: 'block',
                        maxHeight: '1.3em', //max 1 line
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
        <ListItemButton
          sx={{ mb: 0.5 }}
          onClick={() => {
            handleLinkClick(`/profiles`);
          }}
        >
          <ListItemIcon>
            <GroupIcon sx={{ color: theme.palette.grey[800], fontSize: 28 }} />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="heavylabel1"
                sx={{ color: theme.palette.grey[800] }}
              >
                All Profiles
              </Typography>
            }
          />
        </ListItemButton>
        <Divider sx={{ my: 1.5 }} />
        <ListItemButton
          sx={{ mb: 0.5 }}
          onClick={() => {
            handleLinkClick(`/collection/services`);
          }}
        >
          <ListItemIcon>
            <EngineeringIcon
              sx={{ color: theme.palette.grey[800], fontSize: 28 }}
              // sx={{ color: 'secondary.dark' }}
            />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="heavylabel1"
                sx={{ color: theme.palette.grey[800] }}
                // sx={{ color: 'secondary.dark', fontWeight: 700 }}
              >
                Services
              </Typography>
            }
          />
        </ListItemButton>
        {/* <ListItem
          sx={{
            mt: 3,
            width: '100%',
            // display: 'flex',
            // alignItems: 'center',
            // justifyContent: 'center',
          }}
        >
          <Button
            variant="outlined"
            sx={{
              px: 2.5,
              py: 1,
              // bgcolor: 'secondary.main',
              borderRadius: '30px',
              borderColor: 'secondary.main',
            }}
            onClick={() => {
              handleLinkClick(`/collection/services`);
            }}
          >
            <Stack direction="row" gap={1} className="flexCenter">
              <EngineeringIcon
                fontSize:32,
                sx={{ color: 'secondary.main' }}
              />
              <Typography
                variant="heavylabel1"
                sx={{ color: 'secondary.main',  }}
              >
                Services
              </Typography>
            </Stack>
          </Button>
        </ListItem> */}
        {/* <ListItem>
          <PWAInstallButton />
        </ListItem> */}
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
            mb: 1,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <PWAInstallButton />
        </Grid>
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
          '& .MuiDrawer-paper': {
            width: 280, // You can set this to any fixed width
          },
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
          <Stack direction="row" className="flexCenter" gap={1}>
            <EditNoteIcon
              sx={{ color: theme.palette.grey[800], fontSize: 28 }}
            />
            <Typography
              variant="label1"
              sx={{ color: theme.palette.grey[800] }}
            >
              Your Orders
            </Typography>
          </Stack>
        </MenuItem>
        <MenuItem
          component={RouterLink}
          to="/favorite-sellers"
          onClick={handleMenuClose}
        >
          <Stack direction="row" className="flexCenter" gap={2}>
            <FavoriteIcon
              sx={{ color: theme.palette.grey[800], fontSize: 25 }}
            />
            <Typography
              variant="label1"
              sx={{ color: theme.palette.grey[800] }}
            >
              Favorite Profiles
            </Typography>
          </Stack>
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
