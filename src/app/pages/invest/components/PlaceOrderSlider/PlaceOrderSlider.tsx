import React, { useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Slider } from '@mui/material'
import { isEmptyString } from 'helpers/strings'
export interface PlaceOrderFieldsProps {
  balance: number
  activeTab: number
}

export const PlaceOrderSlider: React.FC<PlaceOrderFieldsProps> = ({
  balance,
  activeTab
}) => {
  const sliderRange = {
    from: 0,
    to: 4,
    maxPercentageValue: 100
  }
  const { setValue, watch } = useFormContext()
  const price = watch('price')
  const amount = watch('amount')
  const [slider, setSlider] = useState(sliderRange.from)

  const isBuy = activeTab === 0

  const computeAmount = (evt: Event, value: number | number[]) => {
    setSlider(value as number)
    const amountNumerator = (balance / sliderRange.to) * (value as number)
    const denominator = isBuy ? price : 1
    const newAmount = value !== 0 ? amountNumerator / denominator : 0
    if (isBuy) {
      setValue('amount', price === 0 || price === '' ? 0 : newAmount)
    } else {
      setValue('amount', newAmount)
    }
  }
  const calculateBuySlider = () => {
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
  }

  const calculateSellSlider = () => {
    if (price !== undefined && amount !== undefined) {
      const totalValue = price * amount
      setValue('total', totalValue)
    }
    if (!isEmptyString(String(amount))) {
      const newSliderValue = (amount / balance) * sliderRange.to
      setSlider(newSliderValue)
    }
    if (isEmptyString(String(price)) && isEmptyString(String(amount))) {
      setValue('total', '')
      setSlider(sliderRange.from)
    }
  }

  const calculateSlider = () => {
    if (isBuy) {
      calculateBuySlider()
    } else {
      calculateSellSlider()
    }
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
    calculateSlider()
  }, [amount, price, balance]) // eslint-disable-line

  return (
    <Slider
      value={slider}
      min={sliderRange.from}
      max={sliderRange.to}
      marks={marks}
      step={0.05}
      disabled={price === null || price === undefined}
      data-testid='slider'
      size='small'
      onChange={computeAmount}
    />
  )
}
