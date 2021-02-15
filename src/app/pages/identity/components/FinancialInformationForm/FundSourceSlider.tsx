import React from 'react'
import { TypedField } from 'components/form/TypedField'
import { sliderValueExtractor } from 'helpers/forms'
import { Box, Slider } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'
import { SliderTooltip } from 'app/pages/identity/components/FinancialInformationForm/SliderTooltip'
import { FundSource } from 'types/identity'

export interface FundSourceSliderProps {
  field: Partial<FundSource>
  index: number
}

export const FundSourceSlider = ({ field, index }: FundSourceSliderProps) => {
  const { control, watch } = useFormContext()
  const isChecked: boolean = watch<string, boolean>(
    `fundSource[${index}].checked`,
    false
  )

  return (
    <Box width={210} height={38}>
      <TypedField
        valueExtractor={sliderValueExtractor}
        customRenderer
        component={Slider}
        name={['fundSource', index, 'value']}
        label={field.name ?? ''}
        defaultValue={field.value}
        control={control}
        min={0}
        max={100}
        valueLabelDisplay='auto'
        ValueLabelComponent={SliderTooltip}
        disabled={!isChecked}
      />
    </Box>
  )
}
