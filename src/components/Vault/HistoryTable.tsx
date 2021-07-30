import { Currency } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import React, { useMemo } from 'react'
import { useEventState } from 'state/eventLog/hooks'
import { DesktopAndTablet, TYPE } from 'theme'
import { ActionHistoryStatus, ActionTypes } from './enum'
import { getStatusIcon, HistoryHeaderWrapper } from './styleds'
import { TransactionHistoryRow } from './TransactionHistoryRow'

export const HistoryHeader = ({
  currencySymbol,
  isTransaction,
}: {
  currencySymbol: string
  isTransaction: boolean
}) => {
  return (
    <HistoryHeaderWrapper>
      <tr>
        <th>
          <TYPE.description2>
            <Trans>Action</Trans>
          </TYPE.description2>
        </th>
        {isTransaction && (
          <th>
            <TYPE.description2>
              <Trans>Value {currencySymbol}</Trans>
            </TYPE.description2>
          </th>
        )}
        <th>
          <TYPE.description2>
            <Trans>Status</Trans>
          </TYPE.description2>
        </th>
        <th>
          <DesktopAndTablet>
            <TYPE.description2>
              <Trans>Date</Trans>
            </TYPE.description2>
          </DesktopAndTablet>
        </th>
      </tr>
    </HistoryHeaderWrapper>
  )
}

export const HistoryTable = ({ currency }: { currency?: Currency }) => {
  const { eventLog } = useEventState()
  const isTransaction = useMemo(
    () => [ActionTypes.WITHDRAW, ActionTypes.DEPOSIT].includes(eventLog[0]?.type),
    [eventLog]
  )
  return (
    <>
      {eventLog.length > 0 && (
        <table style={{ marginTop: '26px', width: '100%', border: 'none' }} cellSpacing="0" cellPadding="0">
          <HistoryHeader currencySymbol={currency?.symbol ?? ''} isTransaction={isTransaction} />
          {currency &&
            eventLog.map((row) => {
              const status = row?.params?.status ?? ActionHistoryStatus.PENDING
              const statusIcon = getStatusIcon(row?.type, status)
              return <TransactionHistoryRow row={row} key={row.createdAt} icon={statusIcon} />
            })}
        </table>
      )}
    </>
  )
}
