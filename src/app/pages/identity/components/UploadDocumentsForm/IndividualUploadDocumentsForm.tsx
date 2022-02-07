import React from 'react'
import { Grid, Typography } from '@mui/material'
import { UploadDocumentField } from 'app/pages/identity/components/UploadDocumentsForm/UploadDocumentField/UploadDocumentField'
import { EvidenceOfAccreditationHelper } from 'app/pages/identity/components/UploadDocumentsForm/EvidenceOfAccreditationHelper'
import { EvindenceOfAccreditationTooltipContent } from 'app/pages/identity/components/UploadDocumentsForm/EvindenceOfAccreditationTooltipContent'

export const IndividualUploadDocumentsForm = () => {
  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <UploadDocumentField
          name='proofOfIdentity'
          label='Proof of Identity'
          helperElement={
            <Typography variant='body1'>
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
            <Typography variant='body1'>
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
