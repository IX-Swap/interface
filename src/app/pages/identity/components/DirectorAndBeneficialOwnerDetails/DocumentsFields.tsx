import React from 'react'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { UploadDocumentField } from 'app/pages/identity/components/UploadDocumentsForm/UploadDocumentField/UploadDocumentField'
import { Box, Grid, Typography } from '@mui/material'
import { DirectorsInformationFieldsProps } from 'app/pages/identity/components/DirectorAndBeneficialOwnerDetails/DirectorsInformationFields'

export const DocumentFields = ({
  fieldId,
  rootName,
  index,
  defaultValue
}: DirectorsInformationFieldsProps) => {
  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <FormSectionHeader
          variant='subsection'
          title='Upload Documents'
          subtitle='Please upload your Proof of Identity and Proof of Address. All account statements and documents should be dated within 3 months.'
        />
      </Grid>
      <Grid item>
        <UploadDocumentField
          fieldId={fieldId}
          name={[rootName, index, 'documents', 'proofOfIdentity']}
          label='Proof of Identity'
          defaultValue={(defaultValue?.documents as any)?.proofOfIdentity ?? []}
          helperElement={
            <>
              <Box m={1} />
              <Typography variant='body1'>
                passport, driving license, NRIC and government issued ID card.
              </Typography>
            </>
          }
        />
      </Grid>
      <Grid item>
        <UploadDocumentField
          fieldId={fieldId}
          name={[rootName, index, 'documents', 'proofOfAddress']}
          label='Proof of Address'
          defaultValue={(defaultValue?.documents as any)?.proofOfAddress ?? []}
          helperElement={
            <>
              <Box m={1} />
              <Typography variant='body1'>
                utility bills, bank statement/credit card statement, tenancy
                agreement, and telecom bill.
              </Typography>
            </>
          }
        />
      </Grid>
    </Grid>
  )
}
