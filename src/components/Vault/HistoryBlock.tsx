import { Currency } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import Column from 'components/Column'
import { Line } from 'components/Line'
import { LoaderThin } from 'components/Loader/LoaderThin'
import { RowCenter, RowStart } from 'components/Row'
import React, { useEffect } from 'react'
import { useEventState, useGetEventCallback } from 'state/eventLog/hooks'
import { useSecTokenId } from 'state/secTokens/hooks'
import { TYPE } from 'theme'
import { HistoryTable } from './HistoryTable'
import { Pagination } from './Pagination'
import { HistoryWrapper } from './styleds'
import { TransactionDetails } from './TransactionDetails'
interface Props {
  currency?: Currency
}

export const HistoryBlock = ({ currency }: Props) => {
  const { eventLogLoading } = useEventState()
  const tokenId = useSecTokenId({ currencyId: (currency as any)?.address })
  const getEvents = useGetEventCallback()
  useEffect(() => {
    if (tokenId) {
      getEvents({ tokenId, filter: 'all' })
    }
  }, [getEvents, tokenId])
  return (
    <>
      <TransactionDetails currency={currency} />
      <HistoryWrapper>
        <Line />
        <RowStart marginTop="36px" marginBottom="25px">
          <TYPE.title5>
            <Trans>History</Trans>
          </TYPE.title5>
        </RowStart>

        {!eventLogLoading && (
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
