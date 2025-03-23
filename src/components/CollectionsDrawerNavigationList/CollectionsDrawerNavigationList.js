import styled from '@emotion/styled';
import {
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { GET_ALL_COLLECTIONS } from '../../apollo/server';
import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { handleError } from '../../context/ErrorContext';

const CustomListItemText = styled(ListItemText)(({ theme }) => ({
  '& .MuiTypography-root': {
    color: theme.palette.common.black,
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: theme.typography.h6.fontSize,
    backgroundColor: '#FFE5B4',
  },
}));

const COLLECTIONS = gql`
  ${GET_ALL_COLLECTIONS}
`;

export default function CollectionsDrawerNavigationList({ handleLinkClick }) {
  const { data, loading, error } = useQuery(COLLECTIONS, {
    onError: (err) => handleError(err),
  });
  const [collections, setCollections] = useState();

  useEffect(() => {
    if (data?.collections?.items) {
      setCollections(data?.collections?.items);
    }
  }, [data]);

  return loading ? (
    <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
      <CircularProgress />
    </Box>
  ) : (
    <List disablePadding>
      {collections?.map((collection) => (
        <Link
          key={collection.id}
          component={RouterLink}
          to={`/collection/${collection.slug}`}
          sx={{ textDecoration: 'none' }}
          onClick={handleLinkClick}
        >
          <ListItem>
            <ListItemButton sx={{ paddingLeft: 4 }}>
              <CustomListItemText primary={collection.name} />
            </ListItemButton>
          </ListItem>
        </Link>
      ))}
    </List>
  );
}
