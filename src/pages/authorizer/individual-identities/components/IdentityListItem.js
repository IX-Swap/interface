import React from 'react';
import {
  TableCell,
  TableRow,
  Typography,
  Select,
  MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import type { Identity } from 'pages/identity/modules/types';

const useStyles = makeStyles({
  formControl: {
    minWidth: 120,
  },
});

const RowStatusComponent = ({
  identity,
  handleSelectChange,
}: {
  identity: Identity,
  handleSelectChange: (identity: Identity, status: string) => void,
}) => {
  const classes = useStyles();
  switch (identity.status) {
    case 'Approved':
      return <Typography color="primary">Approved</Typography>;
    case 'Rejected':
      return <Typography color="error">Rejected</Typography>;
    default:
      return (
        <Select
          className={classes.formControl}
          value={identity.status}
          onChange={(evt: SyntheticInputEvent<HTMLElement>) =>
            handleSelectChange(identity, evt.target.value)
          }
          inputProps={{
            name: 'status',
          }}
        >
          <MenuItem value="Approved">Approved</MenuItem>
          <MenuItem value="Rejected">Rejected</MenuItem>
        </Select>
      );
  }
};

const IdentityListItem = ({
  identity,
  handleSelectChange,
}: {
  identity: Identit,
  handleSelectChange: (identity: Identity, status: string) => void,
}) => {
  const { firstName, lastName, createdAt, countryOfResidence } = identity;

  return (
    <TableRow>
      <TableCell>Individual</TableCell>
      <TableCell align="left">{createdAt}</TableCell>
      <TableCell align="left">{`${firstName} ${lastName}`}</TableCell>
      <TableCell align="left">{countryOfResidence}</TableCell>
      <TableCell align="left">
        <RowStatusComponent
          identity={identity}
          handleSelectChange={handleSelectChange}
        />
      </TableCell>
    </TableRow>
  );
};

export default IdentityListItem;
