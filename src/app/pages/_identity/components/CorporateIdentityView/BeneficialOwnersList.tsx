import { Grid } from '@material-ui/core'
import { BeneficialOwner } from 'app/pages/_identity/components/CorporateIdentityView/BeneficialOwner'
import React from 'react'
import { Personnel } from 'types/identity'

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
