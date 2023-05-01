import React from 'react'
import { Grid, Typography } from '@mui/material'
import { DigitalSecurityOffering } from 'types/dso'
import { Documents } from 'app/pages/identity/components/CorporateIdentityView/Documents'
import { FormSectionHeader } from 'ui/FormSectionHeader/FormSectionHeader'
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'

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
    <Grid container direction='column' spacing={3}>
      <FieldContainer>
        <Grid item container direction={'column'} spacing={5}>
          <Grid item>
            <FormSectionHeader title='Documents' />
          </Grid>
          {dso.subscriptionDocument !== undefined && (
            <Grid item xs={12} container spacing={3}>
              <Grid item xs={12}>
                <Typography>Subscription Document</Typography>
              </Grid>
              <Grid item xs={12} container spacing={1}>
                <Grid item xs={12}>
                  <Documents documents={[dso.subscriptionDocument]} />
                </Grid>
              </Grid>
            </Grid>
          )}

          {supportingDocuments.length > 0 && (
            <Grid item xs={12} container spacing={2}>
              <Grid item xs={12}>
                <Typography>Supporting Documents</Typography>
              </Grid>
              <Grid item xs={12} container spacing={1}>
                <Grid item xs={12}>
                  <Documents documents={supportingDocuments} />
                </Grid>
              </Grid>
            </Grid>
          )}

          {otherDocuments.length > 0 && (
            <Grid item xs={12} container spacing={2}>
              <Grid item xs={12}>
                <Typography>Dataroom</Typography>
              </Grid>
              <Grid item xs={12} container spacing={1}>
                <Grid item xs={12}>
                  <Documents documents={otherDocuments} />
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </FieldContainer>
    </Grid>
  )
}
