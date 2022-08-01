import React from 'react'
import { Grid, Typography } from '@mui/material'
import { DigitalSecurityOffering } from 'types/dso'
import { Documents } from 'app/pages/identity/components/CorporateIdentityView/Documents'

export interface DSODataroomViewProps {
  dso: DigitalSecurityOffering
}

export const DSODataroomView = ({ dso }: DSODataroomViewProps) => {
  const supportingDocuments = dso.documents.filter(
    doc => Object.values(doc).length > 0 && doc.type === 'Supporting Document'
  )

  const otherDocuments = dso.documents.filter(
    doc => Object.values(doc).length > 0 && doc.type === 'Other'
  )

  return (
    <Grid container spacing={3}>
      {dso.subscriptionDocument !== undefined && (
        <>
          <Grid item xs={12}>
            <Typography variant='h5'>Subscription Document</Typography>
          </Grid>
          <Grid item xs={12} container spacing={1}>
            <Grid item xs={12}>
              <Documents documents={[dso.subscriptionDocument]} />
            </Grid>
          </Grid>
        </>
      )}

      {supportingDocuments.length > 0 && (
        <>
          <Grid item xs={12}>
            <Typography variant='h5'>Supporting Documents</Typography>
          </Grid>
          <Grid item xs={12} container spacing={1}>
            <Grid item xs={12}>
              <Documents documents={supportingDocuments} />
            </Grid>
          </Grid>
        </>
      )}

      {otherDocuments.length > 0 && (
        <>
          <Grid item xs={12}>
            <Typography variant='h5'>Other Documents</Typography>
          </Grid>
          <Grid item xs={12} container spacing={1}>
            <Grid item xs={12}>
              <Documents documents={otherDocuments} />
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  )
}
