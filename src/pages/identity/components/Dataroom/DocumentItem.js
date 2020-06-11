// @flow
import React from 'react';
import moment from 'moment';
import { Typography, ListItem, Grid, Button } from '@material-ui/core';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { useIdentityState, useIdentityDispatch } from '../../modules';
import { downloadFile, deleteFile } from '../../modules/actions';
import type { Document } from '../../modules/types';
import useStyles from './styles';

const DocumentItem = ({ document }: { document: Document }) => {
  const classes = useStyles();
  const { status, editMode } = useIdentityState();
  const identityDispatch = useIdentityDispatch();

  return (
    <ListItem className={classes.listItem}>
      <Grid container>
        <Grid container item xs={3}>
          <Typography>{document.originalFileName}</Typography>
        </Grid>
        <Grid container item xs={2} justify="center">
          <Typography>
            {moment(document.createdAt).format('DD/MM/YYYY')}
          </Typography>
        </Grid>
        <Grid container item xs={3} justify="center">
          <Typography>{document.title}</Typography>
        </Grid>
        <Grid container item xs={3} justify="center">
          <Typography>{document.type}</Typography>
        </Grid>
        <Grid container item xs={1} justify="flex-end">
          {editMode ? (
            <Button
              onClick={() => deleteFile(identityDispatch, document._id)}
              disabled={status === 'GETTING'}
            >
              <DeleteOutlineIcon />
            </Button>
          ) : (
            <Button
              onClick={() =>
                downloadFile(identityDispatch, document.user, document._id)
              }
              disabled={status === 'GETTING'}
            >
              <CloudDownloadIcon />
            </Button>
          )}
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default DocumentItem;
