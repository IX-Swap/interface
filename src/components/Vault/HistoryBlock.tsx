import { Trans } from '@lingui/macro'
import { Line } from 'components/Line'
import { RowStart } from 'components/Row'
import React, { useRef } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { VariableSizeList as List } from 'react-window'
import { TYPE } from 'theme'
import { VaultState } from './enum'
import {
  accreditationHistoryApproved,
  accreditationHistoryPending,
  accreditationHistoryRejected,
  transactionHistory,
} from './fixtures'
import { ActionHistory } from './interfaces'
import { HistoryWrapper } from './styleds'
import ActionHistoryList from './ActionHistoryList'
import { Currency } from '@ixswap1/sdk-core'

interface Props {
  status: Exclude<VaultState, VaultState.NOT_SUBMITTED>
  currency?: Currency
}

type ActionMap = {
  [key in Exclude<VaultState, VaultState.NOT_SUBMITTED>]: ActionHistory[]
}
const actionMap: ActionMap = {
  [VaultState.PENDING]: accreditationHistoryPending,
  [VaultState.REJECTED]: accreditationHistoryRejected,
  [VaultState.APPROVED]: accreditationHistoryApproved,
}
export const HistoryBlock = ({ status, currency }: Props) => {
  const actions = actionMap[status]
  const transactions = transactionHistory
  // refs for fixed size lists
  const actionList = useRef<List>()
  return (
    <HistoryWrapper>
      <Line />
      <RowStart marginTop="36px" marginBottom="25px">
        <TYPE.title5>
          <Trans>History</Trans>
        </TYPE.title5>
      </RowStart>
      <div style={{ flex: '1 1 auto', height: '200px', marginBottom: '35px' }}>
        <AutoSizer disableWidth>
          {({ height }) => (
            <ActionHistoryList
              height={height}
              listRef={actionList}
              actions={actions}
              transactions={transactions}
              currency={currency}
            />
          )}
        </AutoSizer>
      </div>
    </HistoryWrapper>
  )
}
