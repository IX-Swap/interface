import React from 'react'
import { Box, Divider, Typography } from '@material-ui/core'
import { UploadDocumentField } from 'app/pages/_identity/components/UploadDocumentsForm/UploadDocumentField/UploadDocumentField'
import { PersonnelInformationProps } from 'app/pages/_identity/components/CorporateInformationForm/AuthorizedPersonnel/PersonnelInformation'

export const AuthorizationDocuments = ({
  fieldId,
  rootName,
  index
}: PersonnelInformationProps) => {
  return (
    <UploadDocumentField
      fieldId={fieldId}
      name={[rootName, index, 'documents']}
      label='Authorization Document'
      helperElement={
        <>
          <Box m={1} />
          <Typography variant='body1'>
            Board Resolution, Power of Attorney, Partnership Deed, Trust Deed,
            and Others.
          </Typography>
        </>
      }
    />
  )
}
