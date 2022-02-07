import { Box, Grid, Typography } from '@mui/material'
import { DataroomHeader } from 'components/dataroom/DataroomHeader'
import { DataroomViewRow } from 'components/dataroom/DataroomViewRow'
import { LabelledValue } from 'components/LabelledValue'
import { hasValue } from 'helpers/forms'
import React from 'react'
import { Personnel } from 'app/pages/identity/types/forms'

export interface PersonnelProps {
  personnel: Personnel
  showDocumentHeader: boolean
  documentsTitle: string
}

export const CompanyPersonnel = ({
  personnel,
  showDocumentHeader,
  documentsTitle
}: PersonnelProps) => {
  return (
    <Grid container direction='column' spacing={2}>
      <Grid item>
        <Grid container>
          <Grid item xs={12} md={4}>
            <LabelledValue value={personnel.fullName} label='Fullname' />
          </Grid>
          <Grid item xs={12} md={4}>
            <LabelledValue value={personnel.designation} label='Designation' />
          </Grid>
          <Grid item xs={12} md={4}>
            <LabelledValue value={personnel.email} label='Email Address' />
          </Grid>
        </Grid>
      </Grid>
      <Grid item container>
        <Grid item xs={12} md={4}>
          <LabelledValue
            value={personnel.contactNumber}
            label='Contact Number'
          />
        </Grid>
        {personnel.address !== undefined ? (
          <Grid item xs={12} md={4}>
            <LabelledValue
              value={Object.values(personnel.address)
                .filter(address => hasValue(address))
                .join(', ')}
              label='Residental Address'
            />
          </Grid>
        ) : null}
      </Grid>
      <Box mb={3} />
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
  )
}
