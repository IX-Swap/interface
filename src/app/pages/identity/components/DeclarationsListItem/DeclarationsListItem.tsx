import React, { ReactNode } from 'react'
import { Grid, Typography } from '@mui/material'
import { Icon } from 'ui/Icons/Icon'

export interface DeclarationsListItemProps {
  label: ReactNode
  value: boolean | undefined
}

export const DeclarationsListItem = ({
  label,
  value
}: DeclarationsListItemProps) => {
  return (
    <Grid item container flexWrap={'nowrap'} alignItems={'flex-start'}>
      <Grid item mr={1.5} mt={value === true ? -0.75 : -0.5}>
        {value === true ? (
          <Icon color={'#7DD320'} name={'check'} />
        ) : (
          <Icon color={'#F56283'} name={'close'} />
        )}
      </Grid>
      <Grid item container spacing={1.5} direction={'column'}>
        <Grid item>
          <Typography fontWeight={400}>{label}</Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}
