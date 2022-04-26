import React from 'react'
import { LabelledValue } from 'components/LabelledValue'
import { Grid } from '@mui/material'
import { useStyles } from './FieldsDsiplay.style'

export interface FieldsDisplayProps {
  fields?: Array<{ key: string; value?: string }>
}

export const FieldsDisplay = ({ fields }: FieldsDisplayProps) => {
  const classes = useStyles()
  if (fields === undefined || fields.length < 1) {
    return null
  }

  return (
    <Grid
      container
      spacing={'18px'}
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      {fields.map((field, i) => (
        <Grid item key={i}>
          {field.key !== '' ? (
            <LabelledValue
              className={classes.label}
              label={field.key}
              value={field.value}
            />
          ) : null}
        </Grid>
      ))}
    </Grid>
  )
}
