import { Currency } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import styled from 'styled-components'
import { ChevronElement } from 'components/ChevronElement'
import Popover from 'components/Popover'
import { RowCenter, RowFixed } from 'components/Row'
import { useOnClickOutside } from 'hooks/useOnClickOutside'
import useTheme from 'hooks/useTheme'
import useToggle from 'hooks/useToggle'
import React, { useRef } from 'react'
import { useEventState, useGetEventCallback } from 'state/eventLog/hooks'
import { DesktopAndTablet, LinkStyledButton, TYPE } from 'theme'
import { ActionFilterTabs, ActionHistoryStatus, ActionTypeTextHeader, filterTabs } from './enum'
import { getStatusIcon, HistoryHeaderWrapper } from './styleds'
import { TransactionHistoryRow } from './TransactionHistoryRow'

const PopOverContent = styled.div`
  display: flex;
  gap: 6px;
  flex-direction: column;
  padding: 15px 20px;
`
const UnpaddedLinkStyledButton = styled(LinkStyledButton)`
  padding: 0;
  font-size: 1rem;
  opacity: ${({ disabled }) => (disabled ? '0.4' : '1')};
`

const FilterPopover = ({ options, tokenId }: { options: ActionFilterTabs[]; tokenId: number | null }) => {
  const getEvents = useGetEventCallback()
  return (
    <PopOverContent>
      {options.map((option) => (
        <UnpaddedLinkStyledButton key={option} onClick={() => getEvents({ filter: option, tokenId })}>
          <TYPE.popOver>{ActionTypeTextHeader[option]}</TYPE.popOver>
        </UnpaddedLinkStyledButton>
      ))}
    </PopOverContent>
  )
}

const HistoryHeader = () => {
  const [open, toggle] = useToggle(false)
  const node = useRef<HTMLDivElement>()
  const { filter, tokenId } = useEventState()
  useOnClickOutside(node, open ? toggle : undefined)
  const options = filterTabs.filter((option) => option !== filter)
  return (
    <HistoryHeaderWrapper>
      <tr>
        <th ref={node as any}>
          <Popover show={open} content={<FilterPopover options={options} tokenId={tokenId} />} placement={'bottom'}>
            <RowFixed onClick={toggle}>
              <TYPE.description2>{ActionTypeTextHeader[filter]}</TYPE.description2>
              <ChevronElement showMore={open} />
            </RowFixed>
          </Popover>
        </th>
        <th>
          <TYPE.description2>
            <Trans>Amount</Trans>
          </TYPE.description2>
        </th>
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
  const theme = useTheme()
  return (
    <>
      <table style={{ marginTop: '26px', width: '100%', border: 'none' }} cellSpacing="0" cellPadding="0">
        <HistoryHeader />
        {eventLog.length > 0 &&
          currency &&
          eventLog.map((row) => {
            const status = row?.status ?? row?.params?.status ?? ActionHistoryStatus.PENDING
            const statusIcon = getStatusIcon(row?.type, status)
            return <TransactionHistoryRow row={row} key={row.createdAt} icon={statusIcon} currency={currency} />
          })}
        {eventLog.length === 0 && (
          <tr>
            <td colSpan={4}>
              <RowCenter style={{ padding: '20px' }}>
                <TYPE.main color={theme.text2} textAlign="center">
                  <Trans>No results found.</Trans>
                </TYPE.main>
              </RowCenter>
            </td>
          </tr>
        )}
      </table>
    </>
  )
}
