import React from 'react'
import { Grid, Typography } from '@mui/material'
import { DeclarationsListItem } from 'app/pages/identity/components/DeclarationsListItem/DeclarationsListItem'

export interface DeclarationsListProps {
  title: string
  data: Record<string, boolean | undefined>
  labelMap: Record<string, React.ReactNode>
}

export const DeclarationsList = ({
  title,
  data,
  labelMap
}: DeclarationsListProps) => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography variant={'subtitle1'}>{title}</Typography>
      </Grid>
      <Grid item container spacing={2}>
        {Object.entries(data).map((item, index) => {
          const key = labelMap[item[0]]
          const value = item[1]
          return <DeclarationsListItem key={index} label={key} value={value} />
        })}
      </Grid>
    </Grid>
  )
}
