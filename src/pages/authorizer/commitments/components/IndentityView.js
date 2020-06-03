import React, { useState, useEffect } from 'react';
import { Container, Grid, Button, Typography, Box } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { forEach, findIndex } from 'lodash';
import type { Identity } from 'pages/identity/modules/types';
import declarationTemplate from 'pages/identity/data/declarations';
import { IdentityProvider } from 'pages/identity/modules';
import IndividualIdentityForm from 'pages/identity/pages/individual/IndividualIdentityForm';

// TODO: Remove duplicate code

const formatDeclarations = (
  payloadItems: Array<any>,
  type: 'individual' | 'corporate'
) => {
  const declarations = [];
  forEach(payloadItems, (d) => {
    // get item key
    const key = Object.keys(d)[0];
    // get index of template with same key
    const index = findIndex(
      declarationTemplate[type],
      (item) => item.key === key
    );
    // add merged object
    declarations.push({
      ...declarationTemplate[type][index],
      value: d[key],
    });
  });

  return declarations;
};

const IdentityView = ({
  onClickBack,
  identity,
}: {
  onClickBack: Function,
  identity: Identity,
}) => {
  const [declarations, setDeclarations] = useState([]);

  useEffect(() => {
    const formatted = formatDeclarations(identity.declarations, 'individual');
    setDeclarations(formatted);
    // run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Box mb={3}>
        <Grid container alignItems="center">
          <Button type="button" onClick={() => onClickBack()}>
            <ArrowBackIosIcon />
          </Button>
          <Typography variant="h5">Back</Typography>
        </Grid>
      </Box>

      {identity && (
        <IdentityProvider>
          <IndividualIdentityForm
            identity={{ ...identity, declarations }}
            editMode={false}
            dataroom={identity.documents}
          />
        </IdentityProvider>
      )}
    </Container>
  );
};

export default IdentityView;
