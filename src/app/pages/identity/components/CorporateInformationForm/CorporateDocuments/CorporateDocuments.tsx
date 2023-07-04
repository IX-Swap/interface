import React from 'react'
import { Grid, Typography } from '@mui/material'
import { UploadDocumentField } from 'app/pages/identity/components/UploadDocumentsForm/UploadDocumentField/UploadDocumentField'
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'
import { FormSectionHeader } from 'ui/FormSectionHeader/FormSectionHeader'

export interface ListItemProps {
  children: React.ReactNode
}

export const CorporateDocuments = () => {
  return (
    <Grid item>
      <FieldContainer>
        <Grid container direction={'column'} spacing={5}>
          <Grid item>
            <FormSectionHeader title={'Corporate Documents'} />
          </Grid>
          <Grid item>
            <UploadDocumentField
              name='corporateDocuments'
              label='Corporate Documents'
              hideLabel
              helperElement={
                <Typography color={'text.secondary'} mt={1.5} fontWeight={400}>
                  Company registry profile, certificate of incorporation,
                  memorandum and articles of association, company organization
                  chart, register of shareholders and directors, partnership
                  deed and trust deed
                </Typography>
              }
            />
          </Grid>

          {/* Hidden upload field for documents in Corporate Accreditation. This is to preserve their value in the `documents` field */}
          <Grid item hidden>
            <UploadDocumentField
              name='evidenceOfAccreditation'
              label='Evidence of Accreditation'
            />
            <UploadDocumentField
              name='institutionalInvestorDocuments'
              label='Institutional Investor Documents'
            />
          </Grid>
        </Grid>
      </FieldContainer>
    </Grid>
  )
}
