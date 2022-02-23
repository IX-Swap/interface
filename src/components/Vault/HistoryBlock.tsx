import { Currency } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import Column from 'components/Column'
import { Line } from 'components/Line'
import { LoaderThin } from 'components/Loader/LoaderThin'
import { RowCenter, RowStart } from 'components/Row'
import React, { useEffect } from 'react'
import { useEventState, useGetEventCallback } from 'state/eventLog/hooks'
import { useSecTokenId } from 'state/secTokens/hooks'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { TYPE } from 'theme'
import { formatCurrencyAmount } from 'utils/formatCurrencyAmount'
import { HistoryTable } from './HistoryTable'
import { Pagination } from './Pagination'
import { HistoryWrapper } from './styleds'
import { TransactionDetails } from './TransactionDetails'
interface Props {
  currency?: Currency
  account?: string | null
}

export const HistoryBlock = ({ currency, account }: Props) => {
  const { eventLogLoading } = useEventState()
  const tokenId = useSecTokenId({ currencyId: (currency as any)?.address })
  const getEvents = useGetEventCallback()
  const currencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const balance = formatCurrencyAmount(currencyBalance, currency?.decimals ?? 18)

  useEffect(() => {
    if (tokenId && balance !== '-') {
      getEvents({ tokenId, filter: 'all' })
    }
  }, [getEvents, tokenId, balance])

  return (
    <>
      <TransactionDetails currency={currency} />
      <HistoryWrapper>
        <Line />
        <RowStart marginTop="32px">
          <TYPE.title5>
            <Trans>History</Trans>
          </TYPE.title5>
        </RowStart>

        {!eventLogLoading && balance !== '-' && (
          <Column>
            <HistoryTable currency={currency} />
            <Pagination />
          </Column>
        )}
        {eventLogLoading && (
          <RowCenter style={{ marginTop: '53px', marginBottom: '84px' }}>
            <LoaderThin size={64} />
          </RowCenter>
        )}
      </HistoryWrapper>
    </>
  )
}
