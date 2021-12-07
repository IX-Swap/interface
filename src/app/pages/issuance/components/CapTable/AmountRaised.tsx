import React from 'react'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { abbreviateNumber } from 'helpers/numbers'
import { LOADING_TEXT } from 'components/form/renderUtils'
import { getDSOStats } from 'app/components/DSO/utils'
import { useParams } from 'react-router-dom'
import { AmountRaisedCard } from 'app/pages/issuance/components/AmountRaisedCard'

export interface AmountRaisedProps {
  isNewThemeOn?: boolean
  showFundraiseTooltip?: boolean
  showIcon?: boolean
}

export const AmountRaised = ({
  isNewThemeOn = false,
  showFundraiseTooltip = false,
  showIcon = false
}: AmountRaisedProps) => {
  const { dsoId, issuerId } = useParams<{ dsoId: string; issuerId: string }>()
  const { data, isSuccess } = useDSOById(dsoId, issuerId)

  let value = LOADING_TEXT
  let total = LOADING_TEXT

  if (data === undefined || data.status === 'Draft') {
    value = abbreviateNumber(0)
    total = abbreviateNumber(0)
  }

  if (isSuccess && data !== undefined && data.status !== 'Draft') {
    value = abbreviateNumber(
      data.insight.raisedTotal,
      data.currency.symbol,
      false,
      undefined,
      isNewThemeOn
    )
    total = abbreviateNumber(
      data.totalFundraisingAmount,
      data.currency.symbol,
      false,
      undefined,
      isNewThemeOn
    )
  }

  const percentRaised = data !== undefined ? getDSOStats(data).percentRaised : 0

  return (
    <AmountRaisedCard
      total={total}
      value={value}
      percentRaised={percentRaised}
      isNewThemeOn={isNewThemeOn}
      showFundraiseTooltip={showFundraiseTooltip}
      showIcon={showIcon}
    />
  )
}
