import React, { useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Slider } from '@mui/material'
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
  const computeAmount = (evt: Event, value: number | number[]) => {
    const newAmount =
      value !== 0 ? ((balance / sliderRange.to) * (value as number)) / price : 0
    setSlider(value as number)
    setValue('amount', price === 0 || price === '' ? 0 : newAmount)
  }
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
      setValue('total', '')
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
      onChange={computeAmount}
    />
  )
}
