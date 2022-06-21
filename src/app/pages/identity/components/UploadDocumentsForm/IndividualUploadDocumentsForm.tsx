import React, { Fragment } from 'react'
import { Grid, Typography, Box } from '@mui/material'
import { EvidenceOfAccreditationHelper } from 'app/pages/identity/components/UploadDocumentsForm/EvidenceOfAccreditationHelper'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { VSpacer } from 'components/VSpacer'
import { useStyles } from 'app/pages/identity/components/UploadDocumentsForm/styles'
import { useFormContext } from 'react-hook-form'
import { TypedField } from 'components/form/TypedField'
import { DataroomFileType } from 'config/dataroom'
import { FileUpload } from 'ui/FileUpload/FileUpload'
import { plainValueExtractor } from 'helpers/forms'

export const IndividualUploadDocumentsForm = () => {
  const styles = useStyles()
  const { control } = useFormContext()

  return (
    <Fragment>
      <FormSectionHeader title={'Upload Documents'} />
      <Typography className={styles.text} mt={2}>
        Please upload the following documents. All account statements and
        documents should be dated within 3 months. <br /> Type of document
        format supported is jpg, jpeg, png, gif, tiff, webp, svg, apng, avif,
        jfif, pjpeg, pjp, docx, xlsx, pdf, and odt.
      </Typography>
      <VSpacer size='medium' />
      <Grid container direction='column' spacing={3}>
        <Grid item>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box>
                <Grid item container alignItems='center'>
                  <Typography variant='subtitle1'>Proof of Identity</Typography>
                  <Box pr={1}></Box>
                </Grid>
              </Box>
              <Box mt={1}>
                <Typography className={styles.text} variant='body1'>
                  Passport, Driving License, NRIC, Government Issued ID Card And
                  Others
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Grid item xs={12}>
                <TypedField
                  customRenderer
                  name='proofOfIdentity'
                  control={control}
                  component={FileUpload}
                  label='Upload File'
                  valueExtractor={plainValueExtractor}
                  accept={DataroomFileType.document}
                  fullWidth
                  maxSize={10}
                  documentInfo={{
                    type: 'Proof of Identity',
                    title: 'Proof of Identity'
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box>
                <Grid item container alignItems='center'>
                  <Typography variant='subtitle1'>Proof of Address</Typography>
                  <Box pr={1}></Box>
                </Grid>
              </Box>
              <Box mt={1}>
                <Typography className={styles.text} variant='body1'>
                  Utility Bills, Bank Statement/Credit Card Statement, Tenancy
                  Agreement, Telecom Bill
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Grid item xs={12}>
                <TypedField
                  customRenderer
                  name='proofOfAddress'
                  control={control}
                  component={FileUpload}
                  label='Upload File'
                  valueExtractor={plainValueExtractor}
                  accept={DataroomFileType.document}
                  fullWidth
                  maxSize={10}
                  documentInfo={{
                    type: 'Proof of Address',
                    title: 'Proof of Address'
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box>
                <Grid item container alignItems='center'>
                  <Typography variant='subtitle1'>
                    Evidence of Accreditation
                  </Typography>
                  <Box pr={1}></Box>
                </Grid>
              </Box>
              <Box mt={1}>
                <EvidenceOfAccreditationHelper />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Grid item xs={12}>
                <TypedField
                  customRenderer
                  name='evidenceOfAccreditation'
                  control={control}
                  component={FileUpload}
                  label='Upload File'
                  valueExtractor={plainValueExtractor}
                  accept={DataroomFileType.document}
                  fullWidth
                  maxSize={10}
                  documentInfo={{
                    type: 'Evidence of Accreditation',
                    title: 'Evidence of Accreditation'
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  )
}
