import { Grid } from '@mui/material'
import { LabelledValue } from 'components/LabelledValue'
import React from 'react'
import { Personnel } from 'app/pages/identity/types/forms'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { FieldContainer } from 'app/pages/identity/components/FieldContainer/FieldContainer'
import { Documents } from 'app/pages/identity/components/CorporateIdentityView/Documents'

export interface PersonnelProps {
  personnel: Personnel
  title: string
}

export const CompanyPersonnel = ({ personnel, title }: PersonnelProps) => {
  const documents = personnel.documents.filter(
    doc => doc !== undefined && Object.values(doc).length > 0
  )

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
                value={personnel.designation}
                label='Designation'
              />
            </Grid>

            <Grid item>
              <LabelledValue
                isRedesigned
                value={personnel.contactNumber}
                label='Contact Number'
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item container direction={'column'} spacing={5}>
          <Grid item>
            <FormSectionHeader title='Authorization Document' />
          </Grid>

          <Grid item container direction={'column'} spacing={5}>
            <Documents documents={documents} />
          </Grid>
        </Grid>
      </Grid>
    </FieldContainer>
  )
}
