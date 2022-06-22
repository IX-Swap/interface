import { Grid } from '@mui/material'
import { BeneficialOwner } from 'app/pages/identity/components/CorporateIdentityView/BeneficialOwner'
import React from 'react'
import { CorporateIdentity } from 'app/pages/identity/types/forms'

export interface BeneficialOwnersListProps {
  data: CorporateIdentity
}

export const BeneficialOwnersList = ({ data }: BeneficialOwnersListProps) => {
  const { beneficialOwners } = data
  const titleText = 'Beneficial Owners Information'
  const getDocumentTitle = (index: number) =>
    beneficialOwners.length > 1 ? `(${index + 1}) ${titleText}` : titleText

  if (beneficialOwners.length < 1) {
    return null
  }

  return (
    <Grid item container direction='column' spacing={2}>
      {beneficialOwners.map((item, i) => (
        <Grid item key={i}>
          <BeneficialOwner title={getDocumentTitle(i)} data={item} />
        </Grid>
      ))}
    </Grid>
  )
}
