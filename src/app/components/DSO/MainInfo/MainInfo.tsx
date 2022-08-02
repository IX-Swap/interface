import { Grid, Paper, Typography } from '@mui/material'
import { Info } from 'app/components/DSO/MainInfo/Info'
import { Expandable } from 'app/components/Expandable/Expandable'
import { formatDateToMMDDYY } from 'helpers/dates'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'

export interface MainInfoProps {
  dso: DigitalSecurityOffering
}

export const MainInfo = ({ dso }: MainInfoProps) => {
  const { isTablet } = useAppBreakpoints()

  const expandedComponent = () => (
    <>
      <Grid item xs={12}>
        <Info label='Network' value={dso.network?.name} />
      </Grid>
      <Grid item xs={12}>
        <Info label='Decimal' value={dso.decimals} />
      </Grid>
      <Grid item xs={12}>
        <Info label='Capital Structure' value={dso.capitalStructure} />
      </Grid>
      <Grid item xs={12}>
        <Info label='Launch Date' value={formatDateToMMDDYY(dso.launchDate)} />
      </Grid>
      <Grid item xs={12}>
        <Info
          label='Completion Date'
          value={formatDateToMMDDYY(dso.completionDate)}
        />
      </Grid>
    </>
  )

  return (
    <Paper sx={{ p: { xs: 3, md: 5 }, borderRadius: 2 }}>
      {isTablet ? (
        <Expandable
          noBorders
          spacing={3}
          showArrow
          mainComponent={<Typography variant='h4'>Main Info</Typography>}
          expandedComponent={
            <Grid container spacing={3}>
              {expandedComponent()}
            </Grid>
          }
        />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant='h4'>Main Info</Typography>
          </Grid>
          {expandedComponent()}
        </Grid>
      )}
    </Paper>
  )
}
