// @flow
import React from 'react';
import type { DsoTeamMember } from 'context/dso/types';
import { Box, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  photo: {
    height: '50px',
    width: '50px',
    borderRadius: '50px',
    backgroundColor: '#f0f0f0',
    marginRight: '18px',
  },
}));

const TeamMember = ({ member }: { member: DsoTeamMember }) => {
  const classes = useStyles();

  return (
    <Box pt={4} px={4} pb={2} style={{ borderBottom: '1px solid #f0f0f0' }}>
      <Grid container>
        <div
          className={classes.photo}
          style={{ backgroundImage: `url('${member.photo}')` }}
        />
        <Box>
          <Typography>{member.name}</Typography>
          <Typography>
            <b>{member.position}</b>
          </Typography>
        </Box>
      </Grid>
      <Box mt={4}>
        <Typography paragraph>
          <span dangerouslySetInnerHTML={{ __html: member.about }} />
        </Typography>
      </Box>
    </Box>
  );
};

export default TeamMember;
