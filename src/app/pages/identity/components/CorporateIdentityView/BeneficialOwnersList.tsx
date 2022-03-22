import { Grid } from '@mui/material'
import { BeneficialOwner } from 'app/pages/identity/components/CorporateIdentityView/BeneficialOwner'
import React from 'react'
import { Personnel } from 'app/pages/identity/types/forms'

export interface BeneficialOwnersListProps {
  personnel: Personnel[]
  showDocumentHeader?: boolean
  documentsTitle?: string
}

export const BeneficialOwnersList = ({
  personnel,
  showDocumentHeader = false,
  documentsTitle = 'Documents'
}: BeneficialOwnersListProps) => {
  if (personnel.length < 1) {
    return null
  }

  return (
    <Grid container direction='column' spacing={6}>
      {personnel.map((personnel, i) => (
        <Grid item key={i}>
          <BeneficialOwner
            personnel={personnel}
            showDocumentHeader={showDocumentHeader}
            documentsTitle={documentsTitle}
          />
        </Grid>
      ))}
    </Grid>
  )
}
