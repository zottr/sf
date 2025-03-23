import { Typography, Box, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

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
          // borderRadius: '15px',
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <Box
          sx={{
            width: '7rem',
            height: '7rem',
            backgroundSize: 'cover',
            backgroundPositionX: 'center',
            backgroundPositionY: 'center',
            position: 'relative',
            borderRadius: '10px',
          }}
          style={{
            backgroundImage: `url(${props?.preview?.replace(/\\/g, '/')})`,
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
                  paddingTop: '1.5rem',
                }}
              >
                <Typography
                  variant="button"
                  sx={{
                    color: theme.palette.common.white,
                    fontWeight: 500,
                  }}
                  align="center"
                >
                  Explore All
                </Typography>
                <Typography
                  variant="button"
                  sx={{
                    color: theme.palette.common.white,
                    fontWeight: 500,
                  }}
                  align="center"
                >
                  {props.name} {'>'}
                </Typography>
              </Box>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default CollectionLinkItem;
