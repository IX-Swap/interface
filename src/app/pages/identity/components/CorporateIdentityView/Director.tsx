import React from 'react'
import { Grid } from '@mui/material'
import { LabelledValue } from 'components/LabelledValue'
import { Personnel } from 'app/pages/identity/types/forms'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { FieldContainer } from 'app/pages/identity/components/FieldContainer/FieldContainer'
import { ProofDocuments } from 'app/pages/identity/components/CorporateIdentityView/ProofDocuments'
import { AddressSection } from 'app/pages/identity/components/CorporateIdentityView/AddressSection'

export interface DirectorProps {
  directorData: Personnel
  title: string
}

export const Director = ({ directorData, title }: DirectorProps) => {
  const { documents, address } = directorData

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
                value={directorData.fullName}
                label='Full Name'
              />
            </Grid>

            <Grid item>
              <LabelledValue
                isRedesigned
                value={directorData.email}
                label='Email Address'
              />
            </Grid>

            <Grid item>
              <LabelledValue
                isRedesigned
                value={directorData.legalEntityStatus}
                label='Legal Entity Status'
              />
            </Grid>
          </Grid>

          <Grid item container direction={'column'} spacing={5}>
            <Grid item>
              <LabelledValue
                isRedesigned
                value={directorData.designation}
                label='Designation'
              />
            </Grid>

            <Grid item>
              <LabelledValue
                isRedesigned
                value={directorData.contactNumber}
                label='Contact Number'
              />
            </Grid>

            <Grid item>
              <LabelledValue
                isRedesigned
                value={directorData.countryOfFormation}
                label='Country of Incorporation'
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item container direction={'column'} spacing={5}>
          <Grid item>
            <FormSectionHeader title='Residential Address' />
          </Grid>
          <AddressSection address={address} />
        </Grid>

        <Grid item container direction={'column'} spacing={5}>
          <Grid item>
            <FormSectionHeader title='Upload Documents' />
          </Grid>

          <ProofDocuments documents={documents} />
        </Grid>
      </Grid>
    </FieldContainer>
  )
}
