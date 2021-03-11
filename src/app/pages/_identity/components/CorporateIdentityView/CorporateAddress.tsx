import { Box, Grid, Typography } from '@material-ui/core'
import { AddressView } from 'app/pages/_identity/components/IndividualIdentityView/AddressView/AddressView'
import React from 'react'
import { CorporateIdentity } from 'types/identity'

export interface CorporateAddressProps {
  registeredAddress: CorporateIdentity['companyAddress']
  mailingAddress?: CorporateIdentity['companyAddress']
}

export const CorporateAddress = ({
  registeredAddress,
  mailingAddress
}: CorporateAddressProps) => {
  return (
    <Grid container direction='column' spacing={3}>
      {mailingAddress !== undefined ? (
        <Grid item>
          <Typography variant='subtitle1'>
            Address for Correspondence
          </Typography>
          <Box mb={3} />
          <AddressView data={mailingAddress} />
        </Grid>
      ) : null}

      <Grid item spacing={3} style={{ marginTop: 30 }}>
        {mailingAddress !== undefined ? (
          <>
            <Typography variant='subtitle1'>Registered Address</Typography>
            <Box mb={3} />
          </>
        ) : null}
        <AddressView data={registeredAddress} />
      </Grid>
    </Grid>
  )
}
