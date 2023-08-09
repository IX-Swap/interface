import React from 'react'
import { Grid, Typography } from '@mui/material'
import { ProofOfIdentityField } from 'app/pages/identity/components/UploadDocumentsForm/UploadDocumentField/ProofOfIdentityField'
import { FormSectionHeader } from 'ui/FormSectionHeader/FormSectionHeader'
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'
import { useStyles } from 'app/pages/identity/components/UploadDocumentsForm/styles'

export const IndividualUploadDocumentsForm = () => {
  const styles = useStyles()

  return (
    <Grid item xs={12}>
      <FieldContainer>
        <Grid container direction='column' spacing={3}>
          <Grid item>
            <FormSectionHeader title={'Proof of Identity'} />
            {/* <Typography className={styles.text} mt={2}>
              Please upload the following documents. All account statements and
              documents should be dated within 3 months.{' '}
            </Typography> */}
            {/* <Typography className={styles.text} mt={2}>
          Type of document format supported is jpg, jpeg, png, gif, tiff, webp,
          svg, apng, avif, jfif, pjpeg, pjp, docx, xlsx, pdf, and odt.
        </Typography> */}
            {/* <VSpacer size='medium' /> */}
          </Grid>
          <Grid item>
            <ProofOfIdentityField
              name='proofOfIdentity'
              label='Proof of Identity'
              hideLabel
              helperElement={
                <Typography className={styles.text} variant='body1'>
                  passport, driving license, NRIC, government issued ID card and
                  others
                </Typography>
              }
            />
          </Grid>
        </Grid>
      </FieldContainer>
    </Grid>
  )
}
