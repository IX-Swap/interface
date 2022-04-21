import React, { useEffect } from 'react'
import { Currency } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'

import Column from 'components/Column'
import { Line } from 'components/Line'
import { LoaderThin } from 'components/Loader/LoaderThin'
import { RowCenter, RowStart } from 'components/Row'
import { useEventState, useGetEventCallback } from 'state/eventLog/hooks'
import { useSecTokenId } from 'state/secTokens/hooks'
import { TYPE } from 'theme'

import { HistoryTable } from './HistoryTable'
import { Pagination } from './Pagination'
import { HistoryWrapper } from './styleds'
import { TransactionDetails } from './TransactionDetails'

interface Props {
  currency?: Currency & { originalSymbol: string }
  account?: string | null
}

let interval = null as any

export const HistoryBlock = ({ currency }: Props) => {
  const { eventLogLoading, page, filter } = useEventState()
  const tokenId = useSecTokenId({ currencyId: (currency as any)?.address })
  const getEvents = useGetEventCallback()

  useEffect(() => {
    if (tokenId) {
      getEvents({ tokenId, filter: 'all' })
    }
  }, [getEvents, tokenId])

  useEffect(() => {
    if (tokenId) {
      interval = setInterval(() => {
        getEvents({ tokenId, page: page || 1, filter: filter || 'all' })
      }, 15000)

      return () => {
        clearInterval(interval)
      }
    }
  }, [getEvents, tokenId, page, filter])

  return (
    <>
      <TransactionDetails currency={currency} />
      <HistoryWrapper>
        <Line />
        <RowStart marginTop="32px">
          <TYPE.title5>
            <Trans>History of deposits and withdrawals</Trans>
          </TYPE.title5>
        </RowStart>

        {eventLogLoading ? (
          <RowCenter style={{ marginTop: '26px' }}>
            <LoaderThin size={48} />
          </RowCenter>
        ) : (
          <Column>
            <HistoryTable currency={currency} />
            <Pagination />
          </Column>
        )}
      </HistoryWrapper>
    </>
  )
}
