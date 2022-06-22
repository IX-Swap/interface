import { Grid } from '@mui/material'
import { LabelledValue } from 'components/LabelledValue'
import React from 'react'
import { Personnel } from 'app/pages/identity/types/forms'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { File } from 'ui/FileUpload/File'
import { FieldContainer } from 'app/pages/identity/components/FieldContainer/FieldContainer'

export interface PersonnelProps {
  personnel: Personnel
  title: string
}

export const CompanyPersonnel = ({ personnel, title }: PersonnelProps) => {
  return (
    <FieldContainer>
      <Grid item container direction={'column'} spacing={5}>
        <Grid item>
          <FormSectionHeader title={title} />
        </Grid>

        <Grid
          item
          container
          spacing={5}
          sx={{
            display: 'grid',
            gridTemplateColumns: { sx: '1fr', sm: '1fr 1fr' }
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
                <File
                  hasError={Object.values(file).length === 0}
                  isFileMissed={Object.values(file).length === 0}
                  label={file.title}
                  value={file}
                  readonly
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </FieldContainer>
  )
}
