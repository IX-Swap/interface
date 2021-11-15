import React, { ChangeEvent, useEffect } from 'react'
import { TypedField } from 'components/form/TypedField'
import { sliderValueExtractor } from 'helpers/forms'
import { Box, Slider, SliderProps, useTheme } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'
import { SliderTooltip } from 'app/pages/identity/components/FinancialInformationForm/SliderTooltip'
import { FundSource } from 'app/pages/identity/types/forms'
import { useFormError } from 'hooks/useFormError'
import { TypedFieldRenderComponentProps } from 'components/form/types'

export interface FundSourceSliderProps {
  field: Partial<FundSource>
  index: number
  fundSourceSum?: number
}

export const CustomSlider = (
  props: TypedFieldRenderComponentProps &
    SliderProps & {
      index: number
      fundSourceSum: number | undefined
    }
) => {
  const { getValues, setValue } = props.control
  const handleChange = (
    event: ChangeEvent<{}>,
    newValue: number | number[]
  ) => {
    const oldValue = getValues(`sourceOfFund[${props.index}].value`)
    const sum = Number(newValue) + Number(props.fundSourceSum) - oldValue
    if (sum <= 100) {
      return setValue(`sourceOfFund[${props.index}].value`, newValue)
    }
  }

  return <Slider {...props} onChange={handleChange} />
}

export const FundSourceSlider = ({
  field,
  index,
  fundSourceSum
}: FundSourceSliderProps) => {
  const { control, watch, setValue } = useFormContext()
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

  return (
    <Box width={210} height={38}>
      <TypedField
        valueExtractor={sliderValueExtractor}
        customRenderer
        component={CustomSlider}
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
        index={index}
        fundSourceSum={fundSourceSum}
        valueLabelDisplay='auto'
        ValueLabelComponent={SliderTooltip}
        disabled={!isChecked}
      />
    </Box>
  )
}
