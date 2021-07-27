import { Currency } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import Column from 'components/Column'
import { Line } from 'components/Line'
import { LoaderThin } from 'components/Loader/LoaderThin'
import { RowCenter, RowStart } from 'components/Row'
import useTheme from 'hooks/useTheme'
import React, { useEffect } from 'react'
import { useEventState, useGetEventCallback } from 'state/eventLog/hooks'
import { useSecTokenId } from 'state/secTokens/hooks'
import { TYPE } from 'theme'
import { ActionTypes } from './enum'
import { HistoryTable } from './HistoryTable'
import { HistoryWrapper } from './styleds'
import { TableTabs } from './TableTabs'

interface Props {
  currency?: Currency
}

export const HistoryBlock = ({ currency }: Props) => {
  const { eventLog, eventLogLoading } = useEventState()
  const tokenId = useSecTokenId({ currencyId: (currency as any)?.address })
  const getEvents = useGetEventCallback()
  const theme = useTheme()
  useEffect(() => {
    getEvents({ tokenId, filter: ActionTypes.DEPOSIT })
  }, [getEvents, tokenId])
  return (
    <HistoryWrapper>
      <Line />
      <RowStart marginTop="36px" marginBottom="25px">
        <TYPE.title5>
          <Trans>History</Trans>
        </TYPE.title5>
      </RowStart>
      <TableTabs />
      {eventLog.length > 0 && !eventLogLoading && <HistoryTable currency={currency} />}
      {eventLog.length === 0 && !eventLogLoading && (
        <Column style={{ padding: '20px', height: '100%' }}>
          <TYPE.main color={theme.text2} textAlign="center" mb="20px">
            <Trans>No results found.</Trans>
          </TYPE.main>
        </Column>
      )}
      {eventLogLoading && (
        <RowCenter style={{ marginTop: '53px', marginBottom: '84px' }}>
          <LoaderThin size={64} />
        </RowCenter>
      )}
    </HistoryWrapper>
  )
}
