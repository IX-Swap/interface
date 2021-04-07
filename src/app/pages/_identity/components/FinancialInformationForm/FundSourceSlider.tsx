import React, { useEffect } from 'react'
import { TypedField } from 'components/form/TypedField'
import { sliderValueExtractor } from 'helpers/forms'
import { Box, Slider, useTheme } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'
import { SliderTooltip } from 'app/pages/_identity/components/FinancialInformationForm/SliderTooltip'
import { FundSource } from 'app/pages/_identity/types/forms'
import { useFormError } from 'hooks/useFormError'

export interface FundSourceSliderProps {
  field: Partial<FundSource>
  index: number
  sumOfFundSourcesValues?: number
}

export const FundSourceSlider = ({
  field,
  index,
  sumOfFundSourcesValues
}: FundSourceSliderProps) => {
  const { control, watch, setValue, getValues } = useFormContext()
  const isChecked: boolean = watch<string, boolean>(
    `sourceOfFund[${index}].checked`,
    false
  )
  const theme = useTheme()
  const { hasError } = useFormError(`sourceOfFund[${index}].value`)

  useEffect(() => {
    if (!isChecked) {
      setValue(`sourceOfFund[${index}].value`, 0)
    }
  }, [isChecked]) // eslint-disable-line

  const handleChange = (newValue: any) => {
    const oldValue = getValues(`sourceOfFund[${index}].value`)
    const sum = Number(newValue) + Number(sumOfFundSourcesValues) - oldValue
    if (sum <= 100) {
      return setValue(`sourceOfFund[${index}].value`, newValue)
    }
  }

  return (
    <Box width={210} height={38}>
      <TypedField
        valueExtractor={sliderValueExtractor}
        customRenderer
        component={Slider}
        name={['sourceOfFund', index, 'value']}
        label={field.name ?? ''}
        defaultValue={field.value}
        control={control}
        style={{
          color: !isChecked
            ? theme.palette.grey[400]
            : hasError
            ? theme.palette.error.main
            : theme.palette.primary.main
        }}
        min={0}
        max={100}
        onChange={handleChange}
        valueLabelDisplay='auto'
        ValueLabelComponent={SliderTooltip}
        disabled={!isChecked}
      />
    </Box>
  )
}
