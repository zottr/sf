import { Typography, Box, useTheme, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function CollectionLinkItem(props) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        marginX: '10px',
      }}
    >
      <Box
        sx={{
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <Box
          sx={{
            width: '7.5rem',
            height: '7.5rem',
            backgroundSize: 'cover',
            backgroundPositionX: 'center',
            backgroundPositionY: 'center',
            position: 'relative',
            borderRadius: '15px',
          }}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${props?.preview?.replace(
              /\\/g,
              '/'
            )})`,
            backgroundSize: 'cover',
            position: 'relative',
          }}
        >
          <Box
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
            }}
          >
            <Link
              to={`/collection/${props.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  paddingTop: '2.5rem',
                }}
              >
                <Stack
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography
                    variant="button2"
                    sx={{
                      color: theme.palette.common.white,
                    }}
                  >
                    Explore
                  </Typography>
                  <Typography
                    variant="button2"
                    sx={{
                      color: theme.palette.common.white,
                    }}
                    align="center"
                  >
                    {props.name}
                  </Typography>
                </Stack>
              </Box>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default CollectionLinkItem;
