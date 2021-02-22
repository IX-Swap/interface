import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { Form } from 'components/form/Form'
import { getIdentityFormDefaultValue } from 'app/pages/identity/utils'
import { UploadDocumentField } from 'app/pages/identity/components/UploadDocumentsForm/UploadDocumentField/UploadDocumentField'
import { EvidenceOfAccreditationHelper } from 'app/pages/identity/components/UploadDocumentsForm/EvidenceOfAccreditationHelper'
import { EvindenceOfAccreditationTooltipContent } from 'app/pages/identity/components/UploadDocumentsForm/EvindenceOfAccreditationTooltipContent'

export const UploadDocumentsForm = () => {
  return (
    <Form defaultValues={getIdentityFormDefaultValue(undefined, 'individual')}>
      <Grid container spacing={6} direction='column'>
        <Grid item>
          <Typography>
            Please upload the following documents. All account statements and
            documents should be date within 3 months.
          </Typography>
          <Typography variant='caption'>
            Notes: Type of document formats is supported listed as jpg, jpeg,
            png, gif, tiff, webp, svg, apng, avif, jfif, pjpeg, pjp, docx, xlsx,
            pdf, and odt.
          </Typography>
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
    </Form>
  )
}
