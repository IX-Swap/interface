import { Grid } from '@mui/material'
import React from 'react'
import { CorporateIdentity } from 'app/pages/identity/types/forms'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { FieldContainer } from 'app/pages/identity/components/FieldContainer/FieldContainer'
import { AddressSection } from 'app/pages/identity/components/CorporateIdentityView/AddressSection'

export interface CorporateAddressProps {
  data: CorporateIdentity
}

export const CorporateAddress = ({ data }: CorporateAddressProps) => {
  const { companyAddress, mailingAddress, isMailingAddressSame } = data
  const currentMailingAddress = isMailingAddressSame
    ? companyAddress
    : mailingAddress

  const renderMailingAddressSection = () => {
    if (data.mailingAddress === undefined || data.isMailingAddressSame) {
      return null
    }

    return (
      <>
        <Grid item>
          <FormSectionHeader title='Mailing Address' />
        </Grid>
        <AddressSection address={currentMailingAddress} />
      </>
    )
  }

  return (
    <FieldContainer>
      <Grid item container spacing={5}>
        <Grid item>
          <FormSectionHeader
            title={
              data.isMailingAddressSame
                ? 'Registered & Mailing Address'
                : 'Mailing Address'
            }
          />
        </Grid>
        <AddressSection address={companyAddress} />
        {renderMailingAddressSection()}
      </Grid>
    </FieldContainer>
  )
}
