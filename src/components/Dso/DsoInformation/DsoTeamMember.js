// @flow
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import storage from 'services/storageHelper';
import { getImgUrl } from 'services/httpRequests';
import type { DsoTeamMember } from 'context/dso/types';
import RemoveIcon from '@material-ui/icons/Remove';
import { Box, Typography, Grid, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import Uploader from '../Uploader';
import RichEditor from '../rte';

const useStyles = makeStyles(() => ({
  photo: {
    height: '50px',
    width: '50px',
    borderRadius: '50px',
    backgroundColor: '#f0f0f0',
    marginRight: '18px',
  },
}));

const TeamMember = (
  {
    member,
    edit = false,
    remove,
    index,
    save,
    setValue,
  }: {
    index: number,
    setValue: Function,
    remove: Function,
    edit?: boolean,
    save?: (string) => void,
    member: DsoTeamMember,
  },
  ref: any
) => {
  const classes = useStyles();
  const [imgUrl, setImgUrl] = useState('');

  const setPhoto = async (id) => {
    const x = await getImgUrl(
      `/dataroom/raw/${storage.getUserId()}/${id || ''}`
    );

    setImgUrl(x);
  };

  useEffect(() => {
    setPhoto(member.photo);
  }, []);

  const onDataroomDocumentUploaded = (res) => {
    setValue(`${`team[${index}].photo`}`, res._id);
    setPhoto(res._id);
  };

  return (
    <Box pt={4} px={4} pb={2} style={{ borderBottom: '1px solid #f0f0f0' }}>
      {edit && (
        <Box style={{ textAlign: 'right' }}>
          <Button onClick={() => remove()}>
            <RemoveIcon /> Remove
          </Button>
        </Box>
      )}
      <Grid container>
        <Box mr={2}>
          <div
            className={classes.photo}
            style={{
              backgroundImage: `url(${imgUrl})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              margin: '0 auto',
            }}
          />
          <input
            type="text"
            style={{ opacity: 0, width: 1, height: 1, position: 'absolute' }}
            name={`team[${index}].photo`}
            defaultValue={member.photo}
            ref={ref}
          />
          {edit && (
            <Uploader
              document={{
                title: `Photo ${index}`,
                label: 'team member photo',
                type: 'teamMemberPhoto',
              }}
              showTitle={false}
              edit={edit}
              onUpload={onDataroomDocumentUploaded}
            />
          )}
        </Box>
        {!edit && (
          <Grid item>
            <Typography>{member.name}</Typography>
            <Typography>
              <b>{member.position}</b>
            </Typography>
          </Grid>
        )}
        {edit && (
          <Grid item style={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              label="Name"
              margin="normal"
              inputRef={ref}
              name={`team[${index}].name`}
            />
            <TextField
              label="Position"
              margin="normal"
              inputRef={ref}
              name={`team[${index}].position`}
            />
          </Grid>
        )}
      </Grid>
      <Box mt={4}>
        {!edit && (
          <Typography>
            <span dangerouslySetInnerHTML={{ __html: member.about }} />
          </Typography>
        )}
        {edit && (
          <RichEditor
            value={member.about || 'About the member'}
            ref={ref}
            save={save}
          />
        )}
      </Box>
    </Box>
  );
};

export default React.forwardRef<any, any>(TeamMember);
