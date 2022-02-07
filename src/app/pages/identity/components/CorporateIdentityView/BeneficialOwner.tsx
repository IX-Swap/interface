import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { DataroomHeader } from 'components/dataroom/DataroomHeader'
import { DataroomViewRow } from 'components/dataroom/DataroomViewRow'
import { LabelledValue } from 'components/LabelledValue'
import { Personnel } from 'app/pages/identity/types/forms'

export interface BeneficialOwnerProps {
  personnel: Personnel
  showDocumentHeader: boolean
  documentsTitle: string
}

export const BeneficialOwner = ({
  personnel,
  showDocumentHeader,
  documentsTitle
}: BeneficialOwnerProps) => {
  return (
    <Grid container direction={'column'} spacing={6}>
      <Grid item container>
        <Grid item xs={12} md={4}>
          <LabelledValue value={personnel.fullName} label='Fullname' />
        </Grid>
        <Grid item xs={12} md={4}>
          <LabelledValue
            value={`${personnel.percentageShareholding}%`}
            label='Percentage Shareholding'
          />
        </Grid>
      </Grid>
      <Grid item>
        {personnel.documents !== undefined ? (
          <Grid item>
            <Typography variant='body1'>
              <Box component='span' fontWeight='bold'>
                {documentsTitle}
              </Box>
            </Typography>
            <Box mb={1} />
            <>
              {showDocumentHeader ? <DataroomHeader /> : null}
              {personnel.documents.map(document => (
                <DataroomViewRow
                  showDivider={false}
                  title=''
                  document={document}
                  key={document._id}
                />
              ))}
            </>
          </Grid>
        ) : null}
      </Grid>
    </Grid>
  )
}
