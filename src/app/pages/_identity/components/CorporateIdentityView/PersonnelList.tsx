import { Grid } from '@material-ui/core'
import { CompanyPersonnel } from 'app/pages/_identity/components/CorporateIdentityView/CompanyPersonnel'
import React from 'react'
import { Personnel } from 'types/identity'

export interface PersonnelListProps {
  personnel: Personnel[]
  showDocumentHeader?: boolean
  documentsTitle?: string
}

export const PersonnelList = ({
  personnel,
  showDocumentHeader = false,
  documentsTitle = 'Documents'
}: PersonnelListProps) => {
  if (personnel.length < 1) {
    return null
  }

  return (
    <Grid container direction='column' spacing={6}>
      {personnel.map((personnel, i) => (
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
