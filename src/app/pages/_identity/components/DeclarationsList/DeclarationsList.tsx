import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { DeclarationsListItem } from 'app/pages/_identity/components/DeclarationsListItem/DeclarationsListItem'

export interface DeclarationsListProps {
  title: string
  data: Record<string, boolean>
}

export const DeclarationsList = ({ title, data }: DeclarationsListProps) => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography variant={'subtitle1'}>{title}</Typography>
      </Grid>
      <Grid item container spacing={2}>
        {Object.entries(data).map(item => {
          const key = item[0]
          const value = item[1]
          return <DeclarationsListItem label={key} value={value} />
        })}
      </Grid>
    </Grid>
  )
}
