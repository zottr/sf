/*
This can be used to create multiple layer of collection
navigation along with array-to-tree.ts
*/

import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Link,
  List,
  ListItem,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

export function CollectionList({ collection }) {
  return (
    <List disablePadding>
      {collection?.children.map((child) => (
        <ListItem key={child.id} disableGutters sx={{ paddingY: 0 }}>
          {/* Accordion for Nested Collections */}
          {child?.children && child?.children.length > 0 ? (
            <Accordion
              disableGutters
              elevation={0}
              sx={{
                width: '100%',
                boxShadow: 'none',
                padding: 0,
                backgroundColor: 'inherit',
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                sx={{ padding: 0, margin: 0, backgroundColor: 'inherit' }}
              >
                <Typography variant="b1" color="primary">
                  {child.name}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {/* Recursively render subcollections */}
                <CollectionList collection={child} />
              </AccordionDetails>
            </Accordion>
          ) : (
            // Simple link item for collections without children
            <Link
              component={RouterLink}
              to={`/collection/${child.slug}`}
              underline="hover"
              color="inherit"
              sx={{ width: '100%', padding: 0 }}
            >
              <Typography variant="b1">{child.name}</Typography>
            </Link>
          )}
        </ListItem>
      ))}
    </List>
  );
}

export default CollectionList;
