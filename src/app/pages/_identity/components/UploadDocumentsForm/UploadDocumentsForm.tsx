import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { UploadDocumentField } from 'app/pages/_identity/components/UploadDocumentsForm/UploadDocumentField/UploadDocumentField'
import { EvidenceOfAccreditationHelper } from 'app/pages/_identity/components/UploadDocumentsForm/EvidenceOfAccreditationHelper'
import { EvindenceOfAccreditationTooltipContent } from 'app/pages/_identity/components/UploadDocumentsForm/EvindenceOfAccreditationTooltipContent'

export interface UploadDocumentsFormProps {
  identityType: 'individual' | 'corporate'
  children: React.ReactNode
}

export const UploadDocumentsForm = ({
  children,
  identityType
}: UploadDocumentsFormProps) => {
  return (
    <Grid container spacing={6} direction='column'>
      <Grid item>
        <Typography>
          Please upload the following documents. All account statements and
          documents should be date within 3 months.
        </Typography>
        <Grid item>{children}</Grid>
      </Grid>
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
  )
}
