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
    const noPrice = price === undefined || price === null || price === 0
    const noAmount = amount === undefined || amount === null
    if (noPrice || noAmount) {
      setValue('total', null)
    }
    if (noAmount || balance === 0) {
      setSlider(sliderRange.from)
      return
    }
    setSlider((amount / balance) * sliderRange.to)
    if (!noPrice) {
      const totalValue = price * amount
      setValue('total', totalValue)
    }
  }, [amount, price, balance]) // eslint-disable-line

  return (
    <Slider
      value={slider}
      min={sliderRange.from}
      max={sliderRange.to}
      step={0.05}
      marks={marks}
      classes={{
        rail: classes.rail,
        track: classes.track,
        thumb: classes.thumb,
        mark: classes.mark,
        markActive: classes.markActive
      }}
      data-testid='slider'
      onChange={(evt, value) => {
        const newAmount = balance * ((value as number) / sliderRange.to)
        setSlider(value as number)
        setValue('amount', newAmount)
      }}
    />
  )
}
