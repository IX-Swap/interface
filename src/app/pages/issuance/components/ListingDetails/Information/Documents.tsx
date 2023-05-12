import React from 'react'
import { Grid } from '@mui/material'
import { DataroomFile } from 'types/dataroomFile'
import { FormSectionHeader } from 'ui/FormSectionHeader/FormSectionHeader'
import { DocumentsView } from 'app/pages/issuance/components/ListingDetails/Information/DocumentsView'
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'

export interface DocumentsViewProps {
  title: string
  data: DataroomFile[]
}

export const Documents = ({ title, data }: DocumentsViewProps) => {
  return (
    <Grid container direction='column' spacing={3}>
      <FieldContainer>
        <Grid item container direction={'column'} spacing={5}>
          <Grid item>
            <FormSectionHeader title={title} />
          </Grid>
          <Grid item xs={12}>
            <DocumentsView data={data} />
          </Grid>
        </Grid>
      </FieldContainer>
    </Grid>
  )
}
