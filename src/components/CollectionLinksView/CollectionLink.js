import { Paper, Typography, Box, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

function CollectionLink(props) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        marginX: '.3rem',
        marginBottom: '.5rem',
        textDecoration: 'none',
        width: '5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      component={Link}
      to={`/collection/${props.item.slug}`}
    >
      <Paper
        sx={{
          borderRadius: '50px',
          position: 'relative',
          overflow: 'hidden',
          width: '4rem',
          height: '4rem',
        }}
      >
        <Box
          style={{
            backgroundImage: `url(${props.item?.featuredAsset?.preview.replace(
              /\\/g,
              '/'
            )}?preset=thumb)`,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            backgroundSize: 'cover',
            backgroundPositionX: 'center',
            backgroundPositionY: 'center',
            borderRadius: '50px',
          }}
        />
      </Paper>
      <Typography
        sx={{
          textAlign: 'center',
          color: theme.palette.grey[800],
          marginTop: '0.5rem',
          //avoid word wrapping
          wordWrap: 'break-word', // Ensures long words break and wrap onto the next line
          whiteSpace: 'normal', // Allows the text to wrap within the container
          width: '100%', // Ensure the text takes up the full width of its container
          //line truncate after 2 lines
          display: 'block',
          maxHeight:
            '2.86em' /* Adjust based on your line-height: 2 * (line-height of heavyb3 typography variant) */,
          overflow: 'hidden',
        }}
        variant="heavyb3"
      >
        {props.item.name}
      </Typography>
    </Box>
  );
}

export default CollectionLink;
