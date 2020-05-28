// @flow
import React from 'react';
import type { DsoTeamMember } from 'context/dso/types';
import { Box, Typography, Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

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

const TeamMember = ({
  member,
  edit = false,
}: {
  edit?: boolean,
  member: DsoTeamMember,
}) => {
  const classes = useStyles();

  return (
    <Box pt={4} px={4} pb={2} style={{ borderBottom: '1px solid #f0f0f0' }}>
      <Grid container>
        <Box mr={2}>
          <div
            className={classes.photo}
            style={{ backgroundImage: `url('${member.photo}')` }}
          />
        </Box>
        {!edit && (
          <Grid item direction="column">
            <Typography>{member.name}</Typography>
            <Typography>
              <b>{member.position}</b>
            </Typography>
          </Grid>
        )}
        {edit && (
          <Grid item direction="column" style={{ display: 'flex' }}>
            <TextField label="Name" margin="normal" value={member.name} />
            <TextField
              value={member.position}
              label="Position"
              margin="normal"
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
        {edit && <RichEditor value={member.about || 'About the member'} />}
      </Box>
    </Box>
  );
};

export default TeamMember;
