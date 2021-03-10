import React from 'react'
import { FormSectionHeader } from 'app/pages/_identity/components/FormSectionHeader'
import { UploadDocumentField } from 'app/pages/_identity/components/UploadDocumentsForm/UploadDocumentField/UploadDocumentField'
import { Box, Divider, Grid, Typography } from '@material-ui/core'
import { DirectorsInformationFieldsProps } from 'app/pages/_identity/components/DirectorAndBeneficialOwnerDetails/DirectorsInformationFields'

export const DocumentFields = ({
  fieldId,
  rootName,
  index
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
          helperElement={
            <>
              <Box m={1} />
              <Typography variant='body1'>
                Passport, Driving License, NRIC and Government Issued ID card.
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
          helperElement={
            <>
              <Box m={1} />
              <Typography variant='body1'>
                Utility bills, Bank statement/Credit card statement, Tenancy
                agreement, and Telecom bill.
              </Typography>
            </>
          }
        />
      </Grid>
    </Grid>
  )
}
