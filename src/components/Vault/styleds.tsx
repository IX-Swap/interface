import React from 'react'
import styled, { css, keyframes } from 'styled-components'

import { ReactComponent as Attention } from 'assets/images/attention.svg'
import { ReactComponent as Passed } from 'assets/images/check-success.svg'
import Column from 'components/Column'
import { LoaderThin } from 'components/Loader/LoaderThin'
import { RowBetween } from 'components/Row'
import { gradientBorder, MEDIA_WIDTHS, TYPE } from 'theme'
import { Colors } from 'theme/styled'

import { WithdrawStatus, DepositStatus, ActionTypes } from './enum'

export const NoVaultWrapper = styled.div`
  background: ${({ theme }) => theme.bgG10};
  border-radius: 45px;
  padding: 3rem 12px;
  position: relative;
  display: flex;
  flex-direction: column;
  ${gradientBorder}
`
export const ExistingWrapper = styled.div`
  background: ${({ theme }) => theme.bgG11};
  border-radius: 45px;
  padding: 62px 56px 36px 56px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 1rem;
  `};
`
export const NoVaultTitle = styled.div`
  display: flex;
  justify-content: center;
  text-transform: uppercase;
  text-align: center;
  > div {
    line-height: 28px;
  }
`
export const ExistingTitle = styled.span`
  text-align: left;
  white-space: pre-wrap; /* CSS3 */
  white-space: -moz-pre-wrap; /* Firefox */
  white-space: -pre-wrap; /* Opera <7 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word;
  ${({ theme }) => theme.mediaWidth.upToSmall`
      margin-bottom: 20px;
  `};
`
export const VaultStatusDescription = styled.div`
  text-align: center;
  margin-top: 20px;
  > {
    white-space: pre;
  }
`

export const TitleStatusRow = styled(RowBetween)`
  margin-bottom: 2rem;
  flex-wrap: wrap;
`
export const StatusTitle = styled(TYPE.titleSmall)`
  text-transform: uppercase;
  font-weight: 600 !important;
`

export const HistoryWrapper = styled.div``

export const HistoryRowWraper = styled.tr`
  height: 30px;
  cursor: pointer;
  :hover,
  :active {
    padding: 1px;
    background: ${({ theme }) => theme.bgG2};
  }
`

export const HistoryHeaderWrapper = styled.thead`
  text-align: left;
  height: 30px;
`

export const StyledTableCell = styled.td`
  display: flex;
`

export const IconColumn = styled.span`
  width: fit-content;
`

export const Break = styled(Column)`
  padding-top: 35px;
  padding-bottom: 32px;
  padding-right: 13px;
`

export const AccreditationButtonRow = styled.div`
  display: flex;
  margin-top: 42px;
  justify-content: flex-end;
  align-items: center;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    justify-content: center;
    margin-top: 22px;
  `};
`

export const StyledTitle = styled(TYPE.title4)`
  @media (max-width: 768px) {
    font-size: 28px !important;
  }
`

export const DateBox = styled.div`
  /* width: 123px; */
`

export const WaitingWitdrawalFee = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
`

export const WithdrawStatusIcons = {
  [WithdrawStatus.APPROVED]: <Passed />,
  [WithdrawStatus.FB_TX_PARTIALLY_COMPLETED]: <Passed />,
  [WithdrawStatus.FB_TX_CANCELLED]: <Attention />,
  [WithdrawStatus.FB_TX_BLOCKED]: <Attention />,
  [WithdrawStatus.FB_TX_TIMEOUT]: <Attention />,
  [WithdrawStatus.FB_TX_FAILED]: <Attention />,
  [WithdrawStatus.CANCELLED]: <Attention />,
  [WithdrawStatus.FAILED]: <Attention />,
} as Record<string, JSX.Element>

export const DepositStatusIcons = {
  [DepositStatus.SETTLED]: <Passed />,
  [DepositStatus.FAILED]: <Attention />,
  [DepositStatus.CANCELLED]: <Attention />,
} as Record<string, JSX.Element>

export const getStatusIcon = (action: ActionTypes, status: string) => {
  const StatusIcons = action === ActionTypes.DEPOSIT ? DepositStatusIcons : WithdrawStatusIcons

  return StatusIcons[status] || <LoaderThin size={20} />
}

export const InfoModalHeader = styled.div`
  padding: 24px 32px;
  border-radius: 20px 20px 0px 0px;
  background: ${({ theme }) => theme.bgG4};
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  font-size: 22px;
  color: white;
`
export const InfoModalBody = styled.div<{ isSuccess: boolean }>`
  padding: 24px 32px;
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  background: ${({ theme }) => theme.bg11};
  border-radius: 0px 0px 20px 20px;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    padding: 16px;
  }
  > div {
    background: ${({ theme }) => theme.bgG4};
    border-radius: 20px;
    padding: 16px;
    label {
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
    }
  }
  > div:first-child {
    label {
      font-size: 14px;
      color: ${({ theme }) => theme.text2};
    }
    > hr {
      margin: 8px 0px;
      border: none;
      height: 1px;
      background-color: rgba(237, 206, 255, 0.5);
    }
    > div {
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      display: flex;
      align-items: center;
      column-gap: 8px;
      ${({ isSuccess }) =>
        isSuccess &&
        css`
          svg {
            path {
              fill: ${({ theme }) => theme.green1};
            }
          }
        `}
    }
  }
`

export const StyledQrInfo = styled.div`
  font-size: 12px;
  position: absolute;
  bottom: 0px;
  z-index: 2;
  left: 50%;
  transform: translateX(-50%);
  color: black;
`

export const PendingDepositInfo = styled.div`
  margin-top: 8px;
  font-weight: 300;
  color: ${({ theme }) => theme.text2};
  display: flex;
  flex-direction: column;
`

const progressBarAnimation = keyframes`
 0% { background-position: 0 -26px; }
 50% { background-position: -100px -26px; }
 100% { background-position: -200px -26px; }
`

export const LiniarProgressContainer = styled.div<{ statusColor: keyof Colors }>`
  > div {
    width: 100%;
  }
  margin-top: 8px;
  .MuiLinearProgress-root {
    height: 8px;
    border-radius: 8px;
  }
  .MuiLinearProgress-bar1Buffer {
    border-radius: 8px;
    background-color: ${({ statusColor, theme }) => theme[statusColor]};
  }
  .MuiLinearProgress-dashedColorPrimary {
    background-image: ${({ statusColor, theme }) =>
      `radial-gradient(${theme[statusColor]} 0%, ${theme[statusColor]} 20%, transparent 29%)`};
    background-size: 20px 20px;
    background-position-y: -26px;
  }
  .MuiLinearProgress-dashed {
    animation: ${progressBarAnimation} 3s infinite 0s;
  }
  .MuiLinearProgress-bar2Buffer {
    background-color: transparent;
  }
`
