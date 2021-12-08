import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { booleanValueExtractor } from 'helpers/forms'
import { Checkbox } from 'components/form/Checkbox'
import { TypedField } from 'components/form/TypedField'
import { useFormContext } from 'react-hook-form'

export interface DeclarationsListItem {
  label: string | JSX.Element
  name: string
}

export interface DeclarationsListFieldsProps {
  title?: string
  data: DeclarationsListItem[]
}

export const DeclarationsListFields = ({
  title,
  data
}: DeclarationsListFieldsProps) => {
  const { control } = useFormContext()

  return (
    <Grid container>
      {title !== undefined && (
        <Grid item xs={12}>
          <Typography variant={'subtitle1'}>{title}</Typography>
        </Grid>
      )}
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
            />
          </Grid>
        )
      })}
    </Grid>
  )
}
