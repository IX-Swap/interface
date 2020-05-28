// @flow
import React from 'react';
import type { DsoTeamMember } from 'context/dso/types';
import RemoveIcon from '@material-ui/icons/Remove';
import { Box, Typography, Grid, TextField, Button } from '@material-ui/core';
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

const TeamMember = (
  {
    member,
    edit = false,
    remove,
    index,
    save,
  }: {
    index: number,
    remove: Function,
    edit?: boolean,
    save?: (string) => void,
    member: DsoTeamMember,
  },
  ref: any
) => {
  const classes = useStyles();

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
            style={{ backgroundImage: `url('${member.photo || ''}')` }}
          />
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
