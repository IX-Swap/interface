import { Grid } from '@mui/material'
import { CompanyPersonnel } from 'app/pages/identity/components/CorporateIdentityView/CompanyPersonnel'
import React from 'react'
import { Personnel } from 'app/pages/identity/types/forms'

export interface PersonnelListProps {
  personnel: Personnel[]
}

export const PersonnelList = ({ personnel }: PersonnelListProps) => {
  const titleText = 'Company Authorized Personnel'
  const getDocumentTitle = (index: number) =>
    personnel.length > 1 ? `(${index + 1}) ${titleText}` : titleText

  if (personnel.length < 1) {
    return null
  }

  return (
    <Grid item container direction='column' spacing={2}>
      {personnel.map((personnel, i) => (
        <Grid item key={i}>
          <CompanyPersonnel personnel={personnel} title={getDocumentTitle(i)} />
        </Grid>
      ))}
    </Grid>
  )
}
