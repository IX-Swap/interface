import React from 'react'
import { Grid } from '@mui/material'
import { booleanValueExtractor } from 'helpers/forms'
import { Checkbox } from 'components/form/Checkbox'
import { TypedField } from 'components/form/TypedField'
import { useFormContext } from 'react-hook-form'

export interface DeclarationsListItem {
  label: string | JSX.Element
  name: string
}

export interface DeclarationsListFieldsProps {
  data: DeclarationsListItem[]
}

export const DeclarationsListFields = ({
  data
}: DeclarationsListFieldsProps) => {
  const { control } = useFormContext()

  return (
    <Grid container spacing={2}>
      {data.map(item => {
        return (
          <Grid item xs={12} key={item.name}>
            <TypedField
              customRenderer
              valueExtractor={booleanValueExtractor}
              component={Checkbox}
              control={control}
              label={item.label as any}
              name={item.name}
              defaultValue={false}
              data-testid='Declaration-select'
            />
          </Grid>
        )
      })}
    </Grid>
  )
}
