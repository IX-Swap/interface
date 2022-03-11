import { Grid } from '@mui/material'
import React from 'react'
import { LabelledValue } from 'components/LabelledValue'
import { hasValue } from 'helpers/forms'
import { CorporateIdentity } from 'app/pages/identity/types/forms'

export interface CorporateAddressProps {
  registeredAddress: CorporateIdentity['companyAddress']
  mailingAddress?: CorporateIdentity['companyAddress']
}

export const CorporateAddress = ({
  registeredAddress,
  mailingAddress
}: CorporateAddressProps) => {
  return (
    <Grid container spacing={3}>
      {mailingAddress !== undefined ? (
        <Grid item xs={12} md={4}>
          <LabelledValue
            value={Object.values(mailingAddress)
              .filter(address => hasValue(address))
              .join(', ')}
            label='Address for Correspondence'
          />
        </Grid>
      ) : null}
      <Grid item xs={12} md={4}>
        <LabelledValue
          value={Object.values(registeredAddress)
            .filter(address => hasValue(address))
            .join(', ')}
          label='Registered Address'
        />
      </Grid>
    </Grid>
  )
}
