import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { Grid } from '@material-ui/core'
import { useTaxResidencies } from 'app/pages/_identity/components/TaxDeclarationForm/hooks/useTaxResidencies'
import { ReasonFields } from 'app/pages/_identity/components/TaxDeclarationForm/TinUnavailableFields/ReasonFields'
import { Checkbox } from 'components/form/Checkbox'
import { TypedField } from 'components/form/TypedField'
import { reverseBooleanValueExtractor } from 'helpers/forms'

export interface TinUnavailableFieldsProps {
  index: number
}

export const TinUnavailableFields = (props: TinUnavailableFieldsProps) => {
  const { index } = props
  const { control, watch, setValue, clearErrors } = useFormContext()
  const { singaporeOnly, taxAvailable } = useTaxResidencies(index)

  const isTinAvailable: boolean = watch<string, boolean>(
    `taxResidencies[${index}].taxIdAvailable`
  )

  useEffect(() => {
    if (!isTinAvailable) {
      setValue(`taxResidencies[${index}].taxIdentificationNumber`, '')
      clearErrors(`taxResidencies[${index}].taxIdentificationNumber`)
    }
  }, [isTinAvailable])

  return (
    <Grid container direction='column' spacing={2}>
      <Grid item>
        {/* @ts-ignore */}
        <TypedField
          customRenderer
          component={Checkbox}
          defaultValue={taxAvailable ?? true}
          reverse
          valueExtractor={reverseBooleanValueExtractor}
          control={control}
          name={['taxResidencies', index, 'taxIdAvailable']}
          label='if TIN is not available please indicate reason:'
        />
      </Grid>
      {!taxAvailable && (
        <Grid item>
          <ReasonFields
            index={index}
            disabled={singaporeOnly || taxAvailable}
          />
        </Grid>
      )}
    </Grid>
  )
}
