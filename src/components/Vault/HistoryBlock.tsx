import { Currency } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import { Line } from 'components/Line'
import { LoaderThin } from 'components/Loader/LoaderThin'
import { RowCenter, RowStart } from 'components/Row'
import React, { useEffect, useRef } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { VariableSizeList as List } from 'react-window'
import { useEventState, useGetEventCallback } from 'state/eventLog/hooks'
import { TYPE } from 'theme'
import ActionHistoryList from './ActionHistoryList'
import { HistoryWrapper } from './styleds'

interface Props {
  currency?: Currency
}

export const HistoryBlock = ({ currency }: Props) => {
  const { eventLog, eventLogError, eventLogLoading } = useEventState()

  const getEvents = useGetEventCallback()
  useEffect(() => {
    getEvents()
  }, [getEvents])
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
      {eventLog.length > 0 && !eventLogError && !eventLogLoading && (
        <div style={{ flex: '1 1 auto', height: '200px', marginBottom: '35px' }}>
          <AutoSizer disableWidth>
            {({ height }) => (
              <ActionHistoryList height={height} listRef={actionList} events={eventLog} currency={currency} />
            )}
          </AutoSizer>
        </div>
      )}
      {eventLogLoading && (
        <RowCenter style={{ marginTop: '53px', marginBottom: '84px' }}>
          <LoaderThin size={64} />
        </RowCenter>
      )}
    </HistoryWrapper>
  )
}
