import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { booleanValueExtractor } from 'helpers/forms'
import { Checkbox } from 'components/form/Checkbox'
import { TypedField } from 'components/form/TypedField'
import { useFormContext } from 'react-hook-form'

// TODO Change or delete after added new interfaces
export interface DeclarationsListItem {
  label: string | JSX.Element
  name: string
}

// TODO Change after added new interfaces
export interface DeclarationsListProps {
  title?: string
  data: DeclarationsListItem[]
}

export const DeclarationsList = ({ title, data }: DeclarationsListProps) => {
  const { control } = useFormContext()

  return (
    <Grid container>
      {title != null && (
        <Grid item xs={12}>
          <Typography variant={'subtitle1'}>{title}</Typography>
        </Grid>
      )}
      {data.map(item => {
        return (
          <Grid item xs={12}>
            {/* @ts-ignore */}
            <TypedField
              key={item.name}
              customRenderer
              valueExtractor={booleanValueExtractor}
              component={Checkbox}
              control={control}
              label={item.label as any}
              name={item.name}
            />
          </Grid>
        )
      })}
    </Grid>
  )
}
