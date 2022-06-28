import React from 'react'
import { Grid } from '@mui/material'
import { CorporateIdentity } from 'app/pages/identity/types/forms'
import { Director } from 'app/pages/identity/components/CorporateIdentityView/Director'

export interface DirectorListProps {
  data: CorporateIdentity
}

export const DirectorList = ({ data }: DirectorListProps) => {
  const { directors } = data
  const titleText = 'Directors/Partners/People with Executive Authority'
  const getDocumentTitle = (index: number) =>
    directors.length > 1 ? `(${index + 1}) ${titleText}` : titleText

  if (directors.length < 1) {
    return null
  }

  return (
    <Grid item container direction='column' spacing={2}>
      {directors.map((director, i) => (
        <Grid item key={i}>
          <Director directorData={director} title={getDocumentTitle(i)} />
        </Grid>
      ))}
    </Grid>
  )
}
