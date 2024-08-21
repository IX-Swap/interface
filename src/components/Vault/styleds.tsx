import React from 'react'
import styled, { css, keyframes } from 'styled-components'

import { ReactComponent as Attention } from 'assets/images/newCloseIcon.svg'
import { ReactComponent as Passed } from 'assets/images/check-2.svg'
import Column from 'components/Column'
import { ReactComponent as PendingIcon } from 'assets/images/newPending.svg'
import { RowBetween } from 'components/Row'
import {  MEDIA_WIDTHS, TYPE } from 'theme'
import { Colors } from 'theme/styled'

import { WithdrawStatus, DepositStatus, ActionTypes } from './enum'

export const NoVaultWrapper = styled.div`
  background: ${({ theme }) => theme.bg0};
  border-radius: 8px;
  // padding: 3rem 12px;
  padding: 120px 360px;
  position: relative;
  display: flex;
  flex-direction: column;
  ${({ theme }) => theme.mediaWidth.upToSmall`
  padding: 40px 12px;
  `};
`

export const ExistingWrapper = styled.div`
  background: ${({ theme }) => theme.bg0};
  border-radius: 8px;
  padding: 32px 56px 36px 56px;
  width: 1350px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 1rem;
    width: auto;
  `};
`

export const NoVaultTitle = styled.div`
  display: flex;
  justify-content: center;
  // text-transform: uppercase;
  text-align: center;
  > div {
    line-height: 28px;
  }
`

export const ExistingTitle = styled.span`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    text-align: center;
  `};
  text-align: left;
  white-space: pre-wrap; /* CSS3 */
  white-space: -moz-pre-wrap; /* Firefox */
  white-space: -pre-wrap; /* Opera <7 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word;
`

export const VaultStatusDescription = styled.div`
  text-align: center;
  margin-top: 20px;
  > {
    white-space: pre;
  }
`

export const TitleStatusRow = styled(RowBetween)`
  // margin-bottom: 2rem;
  // flex-wrap: wrap;
`

export const StatusTitle = styled(TYPE.titleSmall)`
  text-transform: uppercase;
  font-weight: 600 !important;
`

export const HistoryWrapper = styled.div``

export const HistoryRowWraper = styled.tr`
  height: 30px;
  cursor: pointer;
  border-bottom: 1px solid red;

  :hover,
  :active {
    padding: 1px;
    // border-bottom: 1px solid red;
    background: ${({ theme }) => theme.bg1};
  }
  > td {
    padding: 0px 4px;
    margin-bottom: 20px;
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

export const StyledTitle = styled(TYPE.title5)`
  @media (max-width: 768px) {
    font-size: 20px !important;
    text-align: center;
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

export const StyledPassed = styled(Passed)`
  ${({ theme }) =>
    theme.config.elements &&
    css`
      path[stroke] {
        fill: none;
        stroke: ${theme.config.elements.main};
      }
    `};
`

const StyledAttention = styled(Attention)`
  ${({ theme }) =>
    theme.config.elements?.main &&
    css`
      > circle[fill='#FF6161'] {
        fill: ${theme.error};
      }
      > circle[stroke='#FF6161'] {
        stroke: ${theme.error};
      }
      line {
        stroke: ${theme.error};
      }
      > circle[fill='#372E5E'] {
        fill: ${theme.config.elements?.main};
      }
    `}
`

export const WithdrawStatusIcons = {
  [WithdrawStatus.APPROVED]: <StyledPassed />,
  [WithdrawStatus.FB_TX_PARTIALLY_COMPLETED]: <StyledPassed />,
  [WithdrawStatus.FB_TX_CANCELLED]: <StyledAttention />,
  [WithdrawStatus.FB_TX_BLOCKED]: <StyledAttention />,
  [WithdrawStatus.FB_TX_TIMEOUT]: <StyledAttention />,
  [WithdrawStatus.FB_TX_FAILED]: <StyledAttention />,
  [WithdrawStatus.CANCELLED]: <StyledAttention />,
  [WithdrawStatus.FAILED]: <StyledAttention />,
} as Record<string, JSX.Element>

export const DepositStatusIcons = {
  [DepositStatus.SETTLED]: <StyledPassed />,
  [DepositStatus.FAILED]: <StyledAttention />,
  [DepositStatus.CANCELLED]: <StyledAttention />,
} as Record<string, JSX.Element>

export const getStatusIcon = (action: ActionTypes, status: string) => {
  const StatusIcons = action === ActionTypes.DEPOSIT ? DepositStatusIcons : WithdrawStatusIcons

  return StatusIcons[status] || <PendingIcon />
}

export const InfoModalHeader = styled.div`
  padding: 5px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  font-size: 18px;
  color: white;

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    padding: 20px;
    background: ${({ theme }) => theme.bg0};
  }
`

export const InfoModalBody = styled.div<{ isSuccess: boolean }>`
  // padding: 1px 32px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  background: ${({ theme }) => theme.bg0};
  border-radius: 0px 0px 20px 20px;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    padding: 10px 16px;
  }
  > div {
    background: ${({ theme }) => theme.bg7};
    border-radius: 8px;
    border: 1px solid #e6e6ff;
    padding: 5px 20px;
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
      background-color: ${({ theme }) => theme.text9};
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

export const LiniarProgressContainer = styled.div<{ statusColor: Exclude<keyof Colors, 'config'> }>`
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

export const WarningPaidFee = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.red1};
  margin-bottom: 18px;
`
export const DepositWarningInfo = styled.div`
  color: ${({ theme }) => theme.error};
  // background-color: #fff0f1;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  > div {
    text-align: center;
    font-weight: 600;
  }
`

export const DeadlineInfo = styled.div`
  font-weight: 500;
  font-size: 10px;
  text-align: center;

  color: #b8b8cc;
  line-height: 15px;
  margin-top: 8px;
`
