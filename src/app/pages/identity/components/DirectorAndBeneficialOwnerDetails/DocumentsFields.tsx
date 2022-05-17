import React from 'react'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { UploadDocumentField } from 'app/pages/identity/components/UploadDocumentsForm/UploadDocumentField/UploadDocumentField'
import { Box, Grid, Typography } from '@mui/material'
import { DirectorsInformationFieldsProps } from 'app/pages/identity/components/DirectorAndBeneficialOwnerDetails/DirectorsInformationFields'
import { pathToString } from 'helpers/forms'

export const DocumentFields = ({
  fieldId,
  rootName,
  index
}: Omit<DirectorsInformationFieldsProps, 'defaultValue'>) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <FormSectionHeader
          title='Upload Documents'
          subtitle='Please upload your Proof of Identity and Proof of Address. All account statements and documents should be dated within 3 months.'
        />
      </Grid>
      <Grid item xs={12}>
        <UploadDocumentField
          name={pathToString([index, 'proofOfIdentity'], rootName)}
          label='Proof of Identity'
          helperElement={
            <>
              <Box m={1} />
              <Typography
                variant='body1'
                fontWeight={400}
                color='textSecondary'
              >
                Passport, Driving License, NRIC, Government Issued ID Card And
                Others
              </Typography>
            </>
          }
        />
      </Grid>
      <Grid item xs={12}>
        <UploadDocumentField
          name={pathToString([index, 'proofOfAddress'], rootName)}
          label='Proof of Address'
          helperElement={
            <>
              <Box m={1} />
              <Typography
                variant='body1'
                fontWeight={400}
                color='textSecondary'
              >
                utility bills, bank statement/credit card statement, tenancy
                agreement, and telecom bill
              </Typography>
            </>
          }
        />
      </Grid>
    </Grid>
  )
}
