import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { DigitalSecurityOffering } from 'types/dso'
import { FormSectionHeader } from 'ui/FormSectionHeader/FormSectionHeader'
import CheckIcon from '@mui/icons-material/Check'

export interface STOSettingsProps {
  sto: DigitalSecurityOffering
}

export const STOSettings = ({ sto }: STOSettingsProps) => {
  const settings = []

  if (!sto.investable) settings.push('Non-Investable')
  if (sto.disabled) settings.push('Disabled')
  if (sto.promoted) settings.push('Promoted')

  return (
    <Grid item display={'flex'} direction={'column'} gap={3}>
      <FormSectionHeader title='Settings' />
      <Grid item xs display={'flex'} direction={'column'} gap={1}>
        {settings.map(setting => (
          <Box display={'flex'} gap={1} alignItems={'center'}>
            <CheckIcon style={{ color: '#7DD320', width: '20px' }} />
            <Typography>{setting}</Typography>
          </Box>
        ))}
      </Grid>
    </Grid>
  )
}
