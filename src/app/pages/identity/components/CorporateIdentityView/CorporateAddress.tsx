import { Grid } from '@mui/material'
import React from 'react'
import { LabelledValue } from 'components/LabelledValue'
import { hasValue } from 'helpers/forms'
import { CorporateIdentity } from 'app/pages/identity/types/forms'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { FieldContainer } from 'app/pages/identity/components/FieldContainer/FieldContainer'

export interface CorporateAddressProps {
  data: CorporateIdentity
}

export const CorporateAddress = ({ data }: CorporateAddressProps) => {
  const { isMobile } = useAppBreakpoints()

  const { companyAddress, mailingAddress, isMailingAddressSame } = data
  const currentMailingAddress = isMailingAddressSame
    ? companyAddress
    : mailingAddress

  const renderAddress = (address: CorporateIdentity['companyAddress']) => {
    if (address === undefined) {
      return null
    }

    const { line1, line2, city, postalCode, state, country } = address

    return (
      <Grid
        item
        sx={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr'
        }}
        container
      >
        <Grid item container direction={'column'} spacing={5}>
          <Grid item>
            <LabelledValue isRedesigned value={line1} label='Line 1' />
          </Grid>
          <Grid item>
            <LabelledValue isRedesigned value={city} label='City' />
          </Grid>
          <Grid item>
            <LabelledValue isRedesigned value={country} label='Country' />
          </Grid>
        </Grid>

        <Grid item container direction={'column'} spacing={5}>
          <Grid item>
            <LabelledValue isRedesigned value={line2} label='Line 2' />
          </Grid>
          <Grid item>
            <LabelledValue isRedesigned value={state} label='State' />
          </Grid>
          <Grid item>
            <LabelledValue
              isRedesigned
              value={postalCode}
              label='Postal Code'
            />
          </Grid>
        </Grid>
      </Grid>
    )
  }

  const renderMailingAddressSection = () => {
    if (Object.values(currentMailingAddress).every(item => !hasValue(item))) {
      return null
    }

    return (
      <>
        <Grid item>
          <FormSectionHeader title='Mailing Address' />
        </Grid>
        {renderAddress(
          data.isMailingAddressSame ? data.companyAddress : data.mailingAddress
        )}
      </>
    )
  }

  return (
    <FieldContainer>
      <Grid item container spacing={5}>
        <Grid item>
          <FormSectionHeader title='Registered Address' />
        </Grid>
        {renderAddress(data.companyAddress)}
        {renderMailingAddressSection()}
      </Grid>
    </FieldContainer>
  )
}
