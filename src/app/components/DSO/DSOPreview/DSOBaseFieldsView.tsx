import React from 'react'
import { Grid } from '@mui/material'
import { DigitalSecurityOffering } from 'types/dso'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import { DSOLogo } from 'app/components/DSO/components/DSOLogo'
import { LabelledValue } from 'components/LabelledValue'

export interface DSOBaseFieldsViewProps {
  dso: DigitalSecurityOffering
}

export const DSOBaseFieldsView = ({ dso }: DSOBaseFieldsViewProps) => {
  return (
    <Grid container spacing={2} direction='column'>
      <Grid item>
        <FormSectionHeader title='DSO Information' />
      </Grid>

      <Grid item>
        <DSOLogo dsoId={dso?._id} size={128} variant='square' />
      </Grid>

      <Grid item>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <LabelledValue label='Token Name' value={dso?.tokenName} />
          </Grid>
          <Grid item xs={12} md={4}>
            <LabelledValue label='Symbol' value={dso?.tokenSymbol} />
          </Grid>
          <Grid item xs={12} md={4}>
            <LabelledValue
              label='Corporate'
              value={dso?.corporate?.companyLegalName}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <LabelledValue label='Network' value={dso?.network?.name} />
          </Grid>
          <Grid item xs={12} md={4}>
            <LabelledValue
              label='Capital Structure'
              value={dso?.capitalStructure}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <LabelledValue label='Decimal' value={dso?.decimalPlaces} />
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <LabelledValue label='Currency' value={dso?.currency?.symbol} />
          </Grid>
          <Grid item xs={12} md={4}>
            <LabelledValue label='Launch Date' value={dso?.launchDate} />
          </Grid>
          <Grid item xs={12} md={4}>
            <LabelledValue
              label='Completion Date'
              value={dso?.completionDate}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <LabelledValue
              label='Unique Identifier Code'
              value={dso?.uniqueIdentifierCode}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
