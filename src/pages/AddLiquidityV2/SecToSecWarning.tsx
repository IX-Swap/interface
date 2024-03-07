import { t } from '@lingui/macro'
import { WarningCard } from 'components/WarningCard'
import React from 'react'

export const SecToSecWarning = () => {
  return (
    <WarningCard
      style={{ background: '#F7F7FA', border: ' 1px solid #E6E6FF', borderRadius: '8px' }}
      name={'liquidPage'}
      message={`Due to increased risk and no reliable mechanism to mitigate IL risks we temporarily disabled the SEC to
              SEC pools`}
    />
  )
}
