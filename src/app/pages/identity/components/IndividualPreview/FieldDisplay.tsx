import React from 'react'
import { LabelledValue } from 'components/LabelledValue'
import { Grid } from '@mui/material'

export interface FieldsDisplayProps {
  fields?: Array<{ key: string; value?: string }>
}

export const FieldsDisplay = ({ fields }: FieldsDisplayProps) => {
  if (fields === undefined || fields.length < 1) {
    return null
  }

  return (
    <Grid container spacing={2}>
      {fields.map((field, i) => (
        <Grid item xs={12} md={4} key={i}>
          {field.key !== '' ? (
            <LabelledValue label={field.key} value={field.value} />
          ) : null}
        </Grid>
      ))}
    </Grid>
  )
}
