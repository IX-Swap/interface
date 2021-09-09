import { Currency } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import { styled } from '@storybook/theming'
import React from 'react'
import { useEventState } from 'state/eventLog/hooks'
import { DesktopAndTablet, ExternalLink, LinkStyledButton, TYPE } from 'theme'
import { ActionHistoryStatus } from './enum'
import { getStatusIcon, HistoryHeaderWrapper } from './styleds'
import { TransactionHistoryRow } from './TransactionHistoryRow'

const PopOverContent = styled.div`
  display: flex;
  gap: 6px;
  flex-direction: column;
  padding: 15px 20px;
`
const StyledMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
`
const UnpaddedLinkStyledButton = styled(LinkStyledButton)`
  padding: 0;
  font-size: 1rem;
  opacity: ${({ disabled }) => (disabled ? '0.4' : '1')};
`

// const popOverContent = () => (
//   <PopOverContent>
//     <ExternalLink href={`https://tokenlists.org/token-list?url=${listUrl}`}>
//       <TYPE.popOver>
//         <Trans>View list</Trans>
//       </TYPE.popOver>
//     </ExternalLink>
//     {handleRemoveList && (
//       <UnpaddedLinkStyledButton onClick={handleRemoveList} disabled={isDisabled}>
//         <TYPE.popOver>
//           <Trans>Remove list</Trans>
//         </TYPE.popOver>
//       </UnpaddedLinkStyledButton>
//     )}
//     {pending && (
//       <UnpaddedLinkStyledButton onClick={handleAcceptListUpdate}>
//         <Trans>Update list</Trans>
//       </UnpaddedLinkStyledButton>
//     )}
//   </PopOverContent>
// )

export const HistoryHeader = () => {
  return (
    <HistoryHeaderWrapper>
      <tr>
        <th>
          <TYPE.description2>
            <Trans>Action</Trans>
          </TYPE.description2>
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

  return (
    <>
      {eventLog.length > 0 && (
        <table style={{ marginTop: '26px', width: '100%', border: 'none' }} cellSpacing="0" cellPadding="0">
          <HistoryHeader />
          {currency &&
            eventLog.map((row) => {
              const status = row?.status ?? row?.params?.status ?? ActionHistoryStatus.PENDING
              const statusIcon = getStatusIcon(row?.type, status)
              return <TransactionHistoryRow row={row} key={row.createdAt} icon={statusIcon} />
            })}
        </table>
      )}
    </>
  )
}
