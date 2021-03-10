import { Grid } from '@material-ui/core'
import { CompanyPersonnel } from 'app/pages/_identity/components/CorporateIdentityView/CompanyPersonnel'
import React from 'react'
import { Personnel } from 'types/identity'

export interface PersonnelListProps {
  personnels: Personnel[]
  showDocumentHeader?: boolean
  documentsTitle?: string
}

export const PersonnelList = ({
  personnels,
  showDocumentHeader = false,
  documentsTitle = 'Documents'
}: PersonnelListProps) => {
  if (personnels.length < 1) {
    return null
  }

  return (
    <Grid container direction='column' spacing={6}>
      {personnels.map((personnel, i) => (
        <Grid item key={i}>
          <CompanyPersonnel
            personnel={personnel}
            showDocumentHeader={showDocumentHeader}
            documentsTitle={documentsTitle}
          />
        </Grid>
      ))}
    </Grid>
  )
}
