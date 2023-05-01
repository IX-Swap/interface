import { Grid } from '@mui/material'
import React from 'react'
import { FormSectionHeader } from 'ui/FormSectionHeader/FormSectionHeader'
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'
import { LabelledValue } from 'components/LabelledValue'

interface FieldGridItems {
  label: string
  value: any
}

interface FieldGridProps {
  title: string
  items: FieldGridItems[]
  columns?: number
  gridOnly?: boolean
}

export const FieldGrid = ({
  title,
  items,
  columns = 3,
  gridOnly = false
}: FieldGridProps) => {
  columns = typeof columns !== 'number' || columns < 1 ? 1 : columns

  const gridItems = (
    <Grid
      item
      container
      spacing={5}
      sx={{
        display: 'grid',
        gridTemplateColumns: { sx: '1fr', sm: '1fr '.repeat(columns) }
      }}
    >
      {items.map(item => (
        <Grid item>
          <LabelledValue isRedesigned label={item.label} value={item.value} />
        </Grid>
      ))}
    </Grid>
  )

  return gridOnly ? (
    gridItems
  ) : (
    <Grid container direction='column' spacing={3}>
      <FieldContainer>
        <Grid item container direction={'column'} spacing={5}>
          <Grid item>
            <FormSectionHeader title={title} />
          </Grid>
          <Grid item>{gridItems}</Grid>
        </Grid>
      </FieldContainer>
    </Grid>
  )
}
