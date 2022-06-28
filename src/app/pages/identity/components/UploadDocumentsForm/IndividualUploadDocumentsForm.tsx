import React from 'react'
import { Grid, Typography } from '@mui/material'
import { UploadDocumentField } from 'app/pages/identity/components/UploadDocumentsForm/UploadDocumentField/UploadDocumentField'
import { EvidenceOfAccreditationHelper } from 'app/pages/identity/components/UploadDocumentsForm/EvidenceOfAccreditationHelper'
import { EvindenceOfAccreditationTooltipContent } from 'app/pages/identity/components/UploadDocumentsForm/EvindenceOfAccreditationTooltipContent'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { VSpacer } from 'components/VSpacer'
import { useStyles } from 'app/pages/identity/components/UploadDocumentsForm/styles'

export const IndividualUploadDocumentsForm = () => {
  const styles = useStyles()
  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <FormSectionHeader title={'Upload Documents'} />
        <Typography className={styles.text} mt={2}>
          Please upload the following documents. All account statements and
          documents should be dated within 3 months. <br /> Type of document
          format supported is jpg, jpeg, png, gif, tiff, webp, svg, apng, avif,
          jfif, pjpeg, pjp, docx, xlsx, pdf, and odt.
        </Typography>
        <VSpacer size='medium' />
      </Grid>
      <Grid item>
        <UploadDocumentField
          name='proofOfIdentity'
          label='Proof of Identity'
          helperElement={
            <Typography className={styles.text} variant='body1'>
              passport, driving license, NRIC, government issued ID card and
              others
            </Typography>
          }
        />
      </Grid>
      <Grid item>
        <UploadDocumentField
          name='proofOfAddress'
          label='Proof of Address'
          helperElement={
            <Typography className={styles.text} variant='body1'>
              utility bills, bank statement/credit card statement, tenancy
              agreement, telecom bill
            </Typography>
          }
        />
      </Grid>
      <Grid item>
        <UploadDocumentField
          name='evidenceOfAccreditation'
          label='Evidence of Accreditation'
          helperElement={<EvidenceOfAccreditationHelper />}
          tooltipContent={<EvindenceOfAccreditationTooltipContent />}
        />
      </Grid>
    </Grid>
  )
}
