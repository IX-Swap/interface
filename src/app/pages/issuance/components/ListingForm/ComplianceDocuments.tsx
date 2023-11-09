import React from 'react'
import { Grid, Typography, Link } from '@mui/material'
import { API_URL } from 'config'
import { FormSectionHeader } from 'ui/FormSectionHeader/FormSectionHeader'
import { UploadDocumentField } from 'app/pages/identity/components/UploadDocumentsForm/UploadDocumentField/UploadDocumentField'

export const ComplianceDocuments = () => {
  return (
    <Grid item container direction='column' spacing={5}>
      <Grid item>
        <FormSectionHeader title={'Upload Documents'} />
      </Grid>

      <Grid item container direction={'column'} spacing={1.5}>
        <Grid item>
          <Typography sx={{ color: '#778194', marginTop: '-20px' }}>
            Please upload your compliance documents based on the{' '}
            <Link
              href={`${API_URL}/IXExchangeTemplateListingProfile.pdf`}
              style={{ cursor: 'pointer' }}
              sx={{
                whiteSpace: 'nowrap'
              }}
              target='_blank'
            >
              IX Exchange Listing Profile Template
            </Link>
            .
          </Typography>
        </Grid>

        <Grid item mt={3}>
          <UploadDocumentField
            name='documents'
            label='Compliance Documents'
            helperElement={
              <Typography variant='body1' sx={{ color: '#778194' }}>
                Key Information Summary, Letter from the Chairperson, Issuer and
                What It Does, Key Features of the Issuer&apos;s Digital
                Securities, Issuer&apos;s Financial Information, Risks to The
                Issuer&apos;s Business and Plans, Tax, Where You Can Find More
                Information, Contact Information, Timetable of Relevant Dates
              </Typography>
            }
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
