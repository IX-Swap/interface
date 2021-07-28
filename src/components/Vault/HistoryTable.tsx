import { Currency } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import Column from 'components/Column'
import React, { useMemo } from 'react'
import { Box } from 'rebass'
import { useEventState } from 'state/eventLog/hooks'
import { TYPE } from 'theme'
import { ActionHistoryStatus, ActionTypes } from './enum'
import { DateColumn, DateDesktop, getStatusIcon, HistoryRowWraper, NameAndSumColumn, StatusColumn } from './styleds'
import { TransactionHistoryRow } from './TransactionHistoryRow'

export const HistoryHeader = ({
  currencySymbol,
  isTransaction,
}: {
  currencySymbol: string
  isTransaction: boolean
}) => {
  return (
    <HistoryRowWraper>
      <NameAndSumColumn>
        <TYPE.description2>
          <Trans>Action</Trans>
        </TYPE.description2>
        {isTransaction && (
          <TYPE.description2>
            <Trans>Value {currencySymbol}</Trans>
          </TYPE.description2>
        )}
      </NameAndSumColumn>
      <StatusColumn>
        <Box marginRight="28px" display="flex" justifyContent="center"></Box>
        <TYPE.description2>
          <Trans>Status</Trans>
        </TYPE.description2>
      </StatusColumn>
      <DateColumn style={{ width: '120px;' }}>
        <DateDesktop>
          <TYPE.description2>
            <Trans>Date</Trans>
          </TYPE.description2>
        </DateDesktop>
        {/* <ChevronElement showMore={show} setShowMore={() => toggleShow()} /> */}
      </DateColumn>
    </HistoryRowWraper>
  )
}
export const HistoryTable = ({ currency }: { currency?: Currency }) => {
  const { eventLog } = useEventState()
  const isTransaction = useMemo(
    () => [ActionTypes.WITHDRAW, ActionTypes.DEPOSIT].includes(eventLog[0]?.type),
    [eventLog]
  )
  return (
    <Column style={{ marginTop: '26px', gap: '18px' }}>
      {eventLog.length > 0 && <HistoryHeader currencySymbol={currency?.symbol ?? ''} isTransaction={isTransaction} />}
      <Column style={{ gap: '11px' }}>
        {currency &&
          eventLog.map((row) => {
            const status = row?.params?.status ?? ActionHistoryStatus.PENDING
            const statusIcon = getStatusIcon(row?.type, status)
            return <TransactionHistoryRow row={row} key={row.createdAt} icon={statusIcon} />
          })}
      </Column>
    </Column>
  )
}
