import React from 'react'
import { Grid } from '@mui/material'
import { DataroomFile } from 'types/dataroomFile'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import { DocumentsView } from 'app/pages/exchange/components/ListingDetails/Information/DocumentsView'

export interface DocumentsViewProps {
  title: string
  data: DataroomFile[]
}

export const Documents = ({ title, data }: DocumentsViewProps) => {
  return (
    <Grid container direction='column' spacing={2}>
      <Grid item>
        <FormSectionHeader title={title} />
      </Grid>
      <Grid item>
        <DocumentsView data={data} />
      </Grid>
    </Grid>
  )
}
