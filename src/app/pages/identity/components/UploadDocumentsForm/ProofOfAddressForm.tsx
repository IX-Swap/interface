import React from 'react'
import { Grid, Typography } from '@mui/material'
import { UploadDocumentField } from 'app/pages/identity/components/UploadDocumentsForm/UploadDocumentField/UploadDocumentField'
import { FormSectionHeader } from 'ui/FormSectionHeader/FormSectionHeader'
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'
import { useStyles } from 'app/pages/identity/components/UploadDocumentsForm/styles'

export const ProofOfAddressForm = () => {
  const styles = useStyles()

  return (
    <Grid item xs={12}>
      <FieldContainer>
        <Grid container direction='column' spacing={3}>
          <Grid item>
            <FormSectionHeader title={'Proof of Address'} />
          </Grid>
          <Grid item>
            <UploadDocumentField
              name='proofOfAddress'
              label='Proof of Address'
              hideLabel
              helperElement={
                <>
                  <Typography mb={2} className={styles.text}>
                    Please upload the following documents. All account
                    statements and documents should be dated within 3 months.{' '}
                  </Typography>
                  <Typography className={styles.text}>
                    Utility Bills, Bank Statement/Credit Card Statement, Tenancy
                    Agreement, Telecom Bill
                  </Typography>
                </>
              }
            />
          </Grid>
          {/* Hidden upload field for documents in Individual Accreditation. This is to preserve their value in the `documents` field */}
          <Grid item hidden>
            <UploadDocumentField
              name='evidenceOfAccreditation'
              label={`Evidence of Accreditation`}
            />
          </Grid>
        </Grid>
      </FieldContainer>
    </Grid>
  )
}
