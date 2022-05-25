import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { Grid, useTheme } from '@mui/material'
import { ReasonFields } from 'app/pages/identity/components/TaxDeclarationForm/TinUnavailableFields/ReasonFields'
import { Checkbox } from 'components/form/Checkbox'
import { TypedField } from 'components/form/TypedField'
import { reverseBooleanValueExtractor } from 'helpers/forms'
import { TaxResidency } from 'app/pages/identity/types/forms'

export interface TinUnavailableFieldsProps {
  index: number
  defaultValue: TaxResidency
}

export const TinUnavailableFields = (props: TinUnavailableFieldsProps) => {
  const { index, defaultValue } = props
  const { control, watch, setValue, clearErrors } = useFormContext()
  const theme = useTheme()

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
    <Grid container direction='column' spacing={2}>
      <Grid item>
        <TypedField
          customRenderer
          component={Checkbox}
          defaultValue={defaultValue?.taxIdAvailable ?? true}
          reverse
          valueExtractor={reverseBooleanValueExtractor}
          control={control}
          name={['taxResidencies', index, 'taxIdAvailable']}
          label='TIN is not available (please indicate reason):'
          labelColor={theme.palette.text.secondary}
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
    </Grid>
  )
}
