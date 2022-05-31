import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { Grid } from '@mui/material'
import { reverseBooleanValueExtractor } from 'helpers/forms'
import { Divider } from 'ui/Divider'
import { Checkbox } from 'components/form/Checkbox'
import { TypedField } from 'components/form/TypedField'
import { TaxResidency } from 'app/pages/identity/types/forms'
import { ReasonFields } from 'app/pages/identity/components/TaxDeclarationForm/TinUnavailableFields/ReasonFields/ReasonFields/ReasonFields'
import useStyles from './TinUnavailableFields.style'

export interface TinUnavailableFieldsProps {
  index: number
  defaultValue: TaxResidency
}

export const TinUnavailableFields = (props: TinUnavailableFieldsProps) => {
  const { index, defaultValue } = props
  const { control, watch, setValue, clearErrors } = useFormContext()
  const classes = useStyles()

  const { singaporeOnly } = control.getValues()
  const isTinAvailable: boolean = watch<string, boolean>(
    `taxResidencies[${index}].taxIdAvailable`
  )

  useEffect(() => {
    if (!isTinAvailable) {
      setValue(`taxResidencies[${index}].taxIdentificationNumber`, '')
      clearErrors(`taxResidencies[${index}].taxIdentificationNumber`)
    }
  }, [isTinAvailable]) // eslint-disable-line

  return (
    <Grid container direction='column'>
      <Grid item>
        <TypedField
          customRenderer
          component={Checkbox}
          defaultValue={defaultValue?.taxIdAvailable ?? true}
          reverse
          className={classes.checkbox}
          valueExtractor={reverseBooleanValueExtractor}
          control={control}
          name={['taxResidencies', index, 'taxIdAvailable']}
          label='TIN Is Not Available (Please Indicate Reason):'
          labelClassName={classes.label}
        />
      </Grid>
      {!isTinAvailable && (
        <Grid item>
          <ReasonFields
            index={index}
            disabled={singaporeOnly === 'yes' || isTinAvailable}
            defaultValue={defaultValue}
          />
        </Grid>
      )}
      <Grid item>
        <Divider />
      </Grid>
    </Grid>
  )
}
