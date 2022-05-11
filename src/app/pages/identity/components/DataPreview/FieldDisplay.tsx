import React from 'react'
import { LabelledValue } from 'components/LabelledValue'
import { Grid } from '@mui/material'
import { useStyles } from 'app/pages/identity/components/DataPreview/FieldsDisplay.style'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { useTheme } from '@mui/material/styles'

export interface FieldsDisplayProps {
  fields?: Array<{ key: string; value?: string }>
}

export const FieldsDisplay = ({ fields }: FieldsDisplayProps) => {
  const classes = useStyles()
  const { isMobile } = useAppBreakpoints()
  const theme = useTheme()
  if (fields === undefined || fields.length < 1) {
    return null
  }

  return (
    <Grid
      container
      className={classes.labelGrid}
      spacing={isMobile ? '0px' : '18px'}
    >
      {fields.map((field, i) => (
        <Grid item key={i}>
          {field.key !== '' ? (
            <LabelledValue
              valueWeight='thin'
              labelWeight='thin'
              labelColor={isMobile ? 'light' : 'identity'}
              valueColor={isMobile ? theme.palette.text.secondary : undefined}
              label={field.key}
              value={field.value}
              className={classes.label}
            />
          ) : null}
        </Grid>
      ))}
    </Grid>
  )
}
