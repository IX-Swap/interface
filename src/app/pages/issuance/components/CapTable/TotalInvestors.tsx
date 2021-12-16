import React from 'react'
import { useTotalInvestors } from 'app/pages/issuance/hooks/useTotalInvestors'
import { TotalInvestorsCard } from 'app/pages/issuance/components/TotalInvestorsCard'

export interface TotalInvestorsProps {
  isNewThemeOn?: boolean
  showIcon?: boolean
}

export const TotalInvestors = ({
  isNewThemeOn = false,
  showIcon = false
}: TotalInvestorsProps) => {
  const { data, isLoading } = useTotalInvestors()

  if (isLoading) {
    return null
  }

  const total = data?.total ?? 0

  return (
    <TotalInvestorsCard
      total={total}
      showIcon={showIcon}
      isNewThemeOn={isNewThemeOn}
    />
  )
}
