import React from 'react'
import { Grid, Typography } from '@mui/material'
import { booleanValueExtractor } from 'helpers/forms'
import { Checkbox } from 'components/form/Checkbox'
import { TypedField } from 'components/form/TypedField'
import { useFormContext } from 'react-hook-form'
import useStyles from './DeclarationsListFields.style'

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
  const classes = useStyles()

  return (
    <Grid container spacing={1}>
      {title !== undefined && (
        <Grid item xs={12} mb={2}>
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
              labelClassName={classes.labelText}
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
