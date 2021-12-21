import { t } from '@lingui/macro'
import { WarningCard } from 'components/WarningCard'
import React from 'react'

export const SecToSecWarning = () => {
  return (
    <WarningCard
      message={t`Due to increased risk and no reliable mechanism to mitigate IL risks we temporarily disabled the SEC to
              SEC pools`}
    />
  )
}
