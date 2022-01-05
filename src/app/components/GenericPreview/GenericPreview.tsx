import React from 'react'
import { Grid } from '@material-ui/core'
import { LabelledValue } from 'components/LabelledValue'
import { privateClassNames } from 'helpers/classnames'

export interface GenericPreviewProps {
  items: Array<{ label: string; value: string; secret?: boolean }>
}

export const GenericPreview = (props: GenericPreviewProps) => {
  const { items } = props

  return (
    <Grid container justifyContent='center' direction='column'>
      <Grid container spacing={1}>
        {items.map((e, i) => (
          <LabelledValue
            className={e.secret === true ? privateClassNames() : ''}
            key={i}
            label={e.label}
            value={e.value}
            row
            justifyContent='space-between'
          />
        ))}
      </Grid>
    </Grid>
  )
}
