import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { UploadDocumentField } from 'app/pages/identity/components/UploadDocumentsForm/UploadDocumentField/UploadDocumentField'
import { EvidenceOfAccreditationHelper } from 'app/pages/identity/components/UploadDocumentsForm/EvidenceOfAccreditationHelper'
import { EvindenceOfAccreditationTooltipContent } from 'app/pages/identity/components/UploadDocumentsForm/EvindenceOfAccreditationTooltipContent'
import { UploadDocumentsForm } from 'app/pages/identity/components/UploadDocumentsForm/UploadDocumentsForm'

export const IndividualUploadDocumentsForm = () => {
  return (
    <UploadDocumentsForm identityType='individual'>
      <Grid container direction='column' spacing={3}>
        <Grid item>
          <UploadDocumentField
            name='documents.proofOfIdentity'
            label='Proof of Identity'
            helperElement={
              <Typography variant='body1'>
                Passport, Driving License, NRIC, Government Issued ID card
              </Typography>
            }
          />
        </Grid>
        <Grid item>
          <UploadDocumentField
            name='documents.proofOfAddress'
            label='Proof of Address'
            helperElement={
              <Typography variant='body1'>
                Utility bills, Bank statement/Credit card statement (not older
                than 3 months), Tenancy/Lease agreement, Telecom bill
              </Typography>
            }
          />
        </Grid>
        <Grid item>
          <UploadDocumentField
            name='documents.evidenceOfAccreditation'
            label='Evidence of Accreditation'
            helperElement={<EvidenceOfAccreditationHelper />}
            tooltipContent={<EvindenceOfAccreditationTooltipContent />}
          />
        </Grid>
      </Grid>
    </UploadDocumentsForm>
  )
}
