// @flow
import React from 'react';
import {
  Typography,
  List,
  ListItem,
  ListSubheader,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { grey } from '@material-ui/core/colors';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import moment from 'moment';

const useStyles = makeStyles(() => ({
  pageTitle: {
    lineHeight: '2em',
  },
  listItemHeader: {
    fontWeight: 'bold',
    color: grey[900],
  },
  listItem: {
    borderBottom: `1px solid ${grey[100]}`,
    padding: '1.15em',
  },
}));

const files = [
  {
    _id: '1',
    originalFileName: 'XX1.pdf',
    title: 'Company document',
    createdAt: '2020-05-15T12:11:32.107Z',
    url: '',
    checksum: '9b43866bc1fa2da88fd65aa9fbe43676',
    type: 'identity/individual',
  },
  {
    _id: '2',
    originalFileName: 'XX2.pdf',
    title: 'Company document',
    createdAt: '2020-05-15T12:11:32.107Z',
    url: '',
    checksum: '9b43866bc1fa2da88fd65aa9fbe43676',
    type: 'identity/individual',
  },
  {
    _id: '3',
    originalFileName: 'XX3.pdf',
    title: 'Company document',
    createdAt: '2020-05-15T12:11:32.107Z',
    url: '',
    checksum: '9b43866bc1fa2da88fd65aa9fbe43676',
    type: 'identity/individual',
  },
  {
    _id: '4',
    originalFileName: 'XXX.pdf',
    title: 'Company document',
    createdAt: '2020-05-15T12:11:32.107Z',
    url: '',
    checksum: '9b43866bc1fa2da88fd65aa9fbe43676',
    type: 'identity/individual',
  },
  {
    _id: '5',
    originalFileName: 'XXX.pdf',
    title: 'Company document',
    createdAt: '2020-05-15T12:11:32.107Z',
    url: '',
    checksum: '9b43866bc1fa2da88fd65aa9fbe43676',
    type: 'identity/individual',
  },
  {
    _id: '6',
    originalFileName: 'XXX.pdf',
    title: 'Company document',
    createdAt: '2020-05-15T12:11:32.107Z',
    url: '',
    checksum: '9b43866bc1fa2da88fd65aa9fbe43676',
    type: 'identity/individual',
  },
];

type File = {
  _id: string,
  title: string,
  type: string,
  originalFileName: string,
  checksum: string,
  createdAt?: string,
  updatedAt?: string,
  url: string,
};

type FileItemProps = {
  file: File,
};

const FileItem = ({ file }: FileItemProps) => {
  const classes = useStyles();

  return (
    <ListItem className={classes.listItem}>
      <Grid container>
        <Grid container item xs={3}>
          <Typography>{file.originalFileName}</Typography>
        </Grid>
        <Grid container item xs={2} justify="center">
          <Typography>{moment(file.createdAt).format('DD/MM/YYYY')}</Typography>
        </Grid>
        <Grid container item xs={3} justify="center">
          <Typography>{file.title}</Typography>
        </Grid>
        <Grid container item xs={3} justify="center">
          <Typography>{file.type}</Typography>
        </Grid>
        <Grid container item xs={1} justify="flex-end">
          <CloudDownloadIcon />
        </Grid>
      </Grid>
    </ListItem>
  );
};

const FileList = () => {
  const classes = useStyles();

  return (
    <List style={{ width: '100%' }}>
      <ListSubheader>
        <Grid container>
          <Grid container item xs={3}>
            <Typography className={classes.listItemHeader}>
              File Name
            </Typography>
          </Grid>
          <Grid container item xs={2} justify="center">
            <Typography className={classes.listItemHeader}>Date</Typography>
          </Grid>
          <Grid container item xs={3} justify="center">
            <Typography className={classes.listItemHeader}>Title</Typography>
          </Grid>
          <Grid container item xs={3} justify="center">
            <Typography className={classes.listItemHeader}>Type</Typography>
          </Grid>
          <Grid container item xs={1}>
            &nbsp;
          </Grid>
        </Grid>
      </ListSubheader>
      {files.map((file) => (
        <FileItem file={file} key={file._id} />
      ))}
    </List>
  );
};

export default FileList;
