import React from 'react'
import { Grid } from '@material-ui/core'
import { LabelledValue } from 'v2/components/LabelledValue'

export interface GenericPreviewProps {
  items: Array<{ label: string; value: string }>
}

export const GenericPreview = (props: GenericPreviewProps) => {
  const { items } = props

  return (
    <Grid container justify='center' direction='column'>
      <Grid container spacing={1}>
        {items.map((e, i) => (
          <LabelledValue
            key={i}
            label={e.label}
            value={e.value}
            row
            justify='space-between'
          />
        ))}
      </Grid>
    </Grid>
  )
}
