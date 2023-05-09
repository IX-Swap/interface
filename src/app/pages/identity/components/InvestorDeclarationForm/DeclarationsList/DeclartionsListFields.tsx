import React from 'react'
import { FormControlLabel, Grid, Typography } from '@mui/material'
import { booleanValueExtractor } from 'helpers/forms'
import { Checkbox } from 'components/form/Checkbox'
import { RadioGroup } from 'components/form/RadioGroup'
import { TypedField } from 'components/form/TypedField'
import { useFormContext } from 'react-hook-form'
import useStyles from './DeclarationsListFields.style'
import { UIRadio } from 'components/UIRadio/UIRadio'

export interface DeclarationsListItem {
  label: string | JSX.Element | Element
  name: string
}

export interface DeclarationsListFieldsProps {
  title?: string
  data: DeclarationsListItem[]
  type?: 'checkbox' | 'radio'
}

export const DeclarationsListFields = ({
  title,
  data,
  type = 'checkbox'
}: DeclarationsListFieldsProps) => {
  const { control } = useFormContext()
  const classes = useStyles()

  return (
    <Grid container spacing={1}>
      {title !== undefined && (
        <Grid item xs={12} mb={2}>
          <Typography
            data-testid={'title-typo'}
            variant={'subtitle1'}
            className={classes.title}
          >
            {title}
          </Typography>
        </Grid>
      )}

      {type === 'checkbox' ? (
        data.map(item => {
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
        })
      ) : (
        <TypedField
          customRenderer
          component={RadioGroup}
          name='expertInvestorAgreement'
          label=''
          control={control}
        >
          <Grid container direction='column'>
            {data.map(item => {
              return (
                <Grid item sx={{ padding: '12px 6px' }}>
                  <FormControlLabel
                    label={<Typography>{item.label}</Typography>}
                    value={item.name}
                    control={<UIRadio />}
                  />
                </Grid>
              )
            })}
          </Grid>
        </TypedField>
      )}
    </Grid>
  )
}
