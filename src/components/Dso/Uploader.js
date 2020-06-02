// @flow
import React, { useRef, useState } from 'react';
import { Button, Typography, ListItem, Grid } from '@material-ui/core';
import type { DocumentGuide } from 'pages/identity/modules/types';
import { snackbarService } from 'uno-material-ui';
import { uploadFile } from './modules/actions';
import useStyles from './styles';

const Uploader = ({
  document,
  edit,
  onUpload,
  originalFileName = '',
  disabled = false,
}: {
  originalFileName?: string,
  disabled?: boolean,
  document: DocumentGuide,
  edit: boolean,
  onUpload: (id: string, type: string) => void,
}) => {
  const [saving, setSaving] = useState(false);
  const classes = useStyles();
  const inputRef = useRef();

  const handleChange = async () => {
    if (inputRef.current) {
      setSaving(true);
      const res = await uploadFile({
        file: inputRef.current?.files?.[0],
        title: document.title,
        type: document.type,
      });

      if (res) {
        onUpload(res, document.type);

        snackbarService.showSnackbar(
          `Successfully uploaded ${document.title}`,
          'success'
        );
      }

      setSaving(false);
    }
  };

  return (
    <ListItem className={classes.listItem}>
      <Grid container>
        <Grid container item xs={8}>
          <Typography>
            {document.title}
            {originalFileName ? ` - ${originalFileName}` : ''}
          </Typography>
        </Grid>

        <Grid container item xs={4} justify="flex-end">
          {edit ? (
            <>
              <input
                ref={inputRef}
                id={`${document.title}-file`}
                multiple
                hidden
                type="file"
                onChange={handleChange}
              />
              {/* eslint-disable-next-line */}
              <label htmlFor={`${document.title}-file`}>
                <Button
                  variant="contained"
                  component="span"
                  disabled={disabled || saving}
                >
                  Upload
                </Button>
              </label>
            </>
          ) : (
            <Typography>No File Uploaded</Typography>
          )}
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default Uploader;
