import { Trans } from '@lingui/macro'
import { AutoColumn } from 'components/Column'
import { Border, ToggleOption, ToggleWrapper } from 'components/Tabs'
import React from 'react'
import { useEventState, useGetEventCallback } from 'state/eventLog/hooks'
import { ActionTypeTextHeader, filterTabs } from './enum'

export const TableTabs = () => {
  const { filter, tokenId } = useEventState()
  const getEvents = useGetEventCallback()
  return (
    <AutoColumn style={{ paddingBottom: 0 }}>
      <ToggleWrapper>
        {filterTabs.map((option) => (
          <ToggleOption key={option} onClick={() => getEvents({ filter: option, tokenId })} active={filter === option}>
            <Trans>{ActionTypeTextHeader[option]}</Trans>
            <Border active={filter === option} />
          </ToggleOption>
        ))}
      </ToggleWrapper>
    </AutoColumn>
  )
}
