import { Grid } from '@mui/material'
import { LabelledValue } from 'components/LabelledValue'
import React from 'react'
import { Personnel } from 'app/pages/identity/types/forms'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { File } from 'ui/FileUpload/File'
import { FieldContainer } from 'app/pages/identity/components/FieldContainer/FieldContainer'

export interface PersonnelProps {
  personnel: Personnel
  documentTitle: string
}

export const CompanyPersonnel = ({
  personnel,
  documentTitle
}: PersonnelProps) => {
  const { isMobile } = useAppBreakpoints()

  return (
    <FieldContainer>
      <Grid item container direction={'column'} spacing={5}>
        <Grid item>
          <FormSectionHeader title={documentTitle} />
        </Grid>

        <Grid
          item
          container
          sx={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr'
          }}
        >
          <Grid item container direction={'column'} spacing={5}>
            <Grid item>
              <LabelledValue
                isRedesigned
                value={personnel.fullName}
                label='Full Name'
              />
            </Grid>

            <Grid item>
              <LabelledValue
                isRedesigned
                value={personnel.email}
                label='Email Address'
              />
            </Grid>
          </Grid>

          <Grid item container direction={'column'} spacing={5}>
            <Grid item>
              <LabelledValue
                isRedesigned
                value={personnel.contactNumber}
                label='Contact Number'
              />
            </Grid>

            <Grid item>
              <LabelledValue
                isRedesigned
                value={personnel.designation}
                label='Designation'
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item container direction={'column'} spacing={5}>
          <Grid item>
            <FormSectionHeader title='Authorization Document' />
          </Grid>

          <Grid item container direction={'column'} spacing={5}>
            {personnel.documents.map(file => (
              <Grid item>
                <File label={file.title} value={file} readonly />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </FieldContainer>
  )
}
