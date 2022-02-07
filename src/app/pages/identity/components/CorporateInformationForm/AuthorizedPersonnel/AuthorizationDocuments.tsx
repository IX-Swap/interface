import React from 'react'
import { Box, Typography } from '@mui/material'
import { UploadDocumentField } from 'app/pages/identity/components/UploadDocumentsForm/UploadDocumentField/UploadDocumentField'
import { PersonnelInformationProps } from 'app/pages/identity/components/CorporateInformationForm/AuthorizedPersonnel/PersonnelInformation'

export const AuthorizationDocuments = ({
  fieldId,
  rootName,
  index,
  defaultValue
}: PersonnelInformationProps) => {
  return (
    <UploadDocumentField
      fieldId={fieldId}
      name={[rootName, index, 'documents']}
      label='Authorization Document'
      defaultValue={defaultValue?.documents ?? []}
      helperElement={
        <>
          <Box m={1} />
          <Typography variant='body1' style={{ fontSize: 16 }}>
            Board resolution, power of attorney, partnership deed, trust deed,
            and others.
          </Typography>
        </>
      }
    />
  )
}
