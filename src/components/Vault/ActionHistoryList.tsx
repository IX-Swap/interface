import { Trans } from '@lingui/macro'
import { Line } from 'components/Line'
import { RowStart } from 'components/Row'
import React from 'react'
import { TYPE } from 'theme'
import { HistoryWrapper } from './styleds'

export const ActionHistoryList = () => {
  return (
    <HistoryWrapper>
      <Line />
      <RowStart marginTop="36px" marginBottom="25px">
        <TYPE.title5>
          <Trans>History</Trans>
        </TYPE.title5>
      </RowStart>
    </HistoryWrapper>
  )
}
