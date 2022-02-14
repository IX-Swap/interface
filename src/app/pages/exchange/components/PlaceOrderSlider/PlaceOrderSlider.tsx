import React, { useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Slider } from '@material-ui/core'
import { useStyles } from 'app/pages/exchange/components/PlaceOrderSlider/PlaceOrderSlider.style'

export interface PlaceOrderFieldsProps {
  balance: number
}

export const PlaceOrderSlider: React.FC<PlaceOrderFieldsProps> = ({
  balance
}) => {
  const sliderRange = {
    from: 0,
    to: 4,
    maxPercentageValue: 100
  }
  const classes = useStyles()
  const { setValue, watch } = useFormContext()
  const price = watch('price')
  const amount = watch('amount')
  const [slider, setSlider] = useState(sliderRange.from)

  const marks = useMemo(() => {
    return Array.from({ length: sliderRange.to + 1 }, (x, i) => i).map(
      element => ({
        label: '',
        value: element
      })
    )
  }, [sliderRange.to])

  useEffect(() => {
    if (price !== undefined && amount !== undefined) {
      const totalValue = price * amount
      setValue('total', totalValue)
      const newSliderValue =
        (sliderRange.maxPercentageValue / balance) *
        totalValue *
        (sliderRange.to / sliderRange.maxPercentageValue)
      setSlider(newSliderValue)
    } else {
      setValue('total', null)
      setSlider(sliderRange.from)
    }
  }, [amount, price, balance]) // eslint-disable-line

  return (
    <Slider
      value={slider}
      min={sliderRange.from}
      max={sliderRange.to}
      marks={marks}
      step={0.05}
      classes={{
        rail: classes.rail,
        track: classes.track,
        thumb: classes.thumb,
        mark: classes.mark,
        markActive: classes.markActive
      }}
      disabled={price === null || price === undefined}
      data-testid='slider'
      onChange={(evt, value) => {
        const newAmount =
          value !== 0
            ? ((balance / sliderRange.to) * (value as number)) / price
            : null
        setSlider(value as number)
        setValue('amount', newAmount)
      }}
    />
  )
}
