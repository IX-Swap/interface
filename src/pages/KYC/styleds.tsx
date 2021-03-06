import styled, { css } from 'styled-components'
import { Box, Flex } from 'rebass'
import React from 'react'
import { t } from '@lingui/macro'
import StickyBox from 'react-sticky-box'

import Card from 'components/Card'
import { cardCommonStyles } from 'pages/CustodianV2/styleds'
import { LoaderThin } from 'components/Loader/LoaderThin'
import { Input } from 'components/Input'

import { KYCStatuses } from './enum'
import { ReactComponent as Attention } from 'assets/images/attention.svg'
import { ReactComponent as Passed } from 'assets/images/check-success.svg'
import { ReactComponent as NonTradable } from 'assets/images/reject.svg'
import { ReactComponent as BigPassed } from 'assets/images/check-success-big.svg'

export const StatusCard = styled(Card)`
  display: flex;
  justify-content: center;
  background: ${({ theme }) => theme.config.background?.secondary || theme.bgG13};
  width: 100%;
  min-height: 630px;
  padding-bottom: 100px;
  ${cardCommonStyles};

  ${({ theme }) => theme.mediaWidth.upToSmall`
    height: 100%;
  `};
`

export const Content = styled(Flex)`
  width: 100%;
  max-width: 580px;
`

export const KYCStatusCard = styled(Card)`
  width: fit-content;
  display: flex;
  align-items: center;
  padding: 8px 32px;
  background: ${({ theme }) => theme.bgG13};
  ${cardCommonStyles};

  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
  `};
`

export const Grid = styled(Box)`
  display: grid;
  grid-template-columns: 1fr 300px;
  grid-gap: 35px;
`

export const FormWrapper = styled.form`
  gap: 35px;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const FormCard = styled.div<{ filled?: boolean }>`
  background: ${({ theme }) => theme.bg18};
  border: ${({ filled, theme }) => `1px solid ${filled ? theme.success : 'transparent'}`};
  padding: 24px 24px 32px 24px;
  border-radius: 16px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 16px;
  `};
`

export const Ul = styled.ul`
  list-style: none;
`

export const Li = styled.li`
  display: flex;
  align-items: center;

  &:before {
    content: '???';
    color: ${({ theme }) => theme.text2};
    display: inline-block;
    width: 1em;
    margin-left: -1em;
  }
`

export const PageLink = styled.div<{ active?: boolean }>`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 4px 0px;
  padding: 8px 16px 8px 24px;
  color: ${({ theme, active }) => (active ? theme.text1 : theme.text9)};
  border-left: ${({ theme, active }) => (active ? `1px solid ${theme.bg14}` : 'none')};
  text-decoration: none;
`

export const FormGrid = styled.div<{ columns?: number }>`
  display: grid;
  grid-template-columns: ${({ columns }) => `repeat(${columns || 2}, 1fr)`};
  grid-gap: 20px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    grid-template-columns: 1fr;
  `};
`

export const ExtraInfoCard = styled.div`
  padding: 12px 8px 12px 27px;
  border-radius: 45px;
  background: ${({ theme }) => theme.bgG12};
`

export const StyledInput = styled(Input)`
  background: ${({ theme }) => theme.bg19};
  color: ${({ theme }) => theme.text2};
`

export const UploaderCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
  width: 100%;
  background: ${({ theme }) => theme.bgG17};
  border: 1px dashed ${({ theme }) => theme.bg7};
  border-radius: 16px;
  cursor: pointer;
`

export const StyledStickyBox = styled(StickyBox).attrs(() => ({ offsetTop: 100 }))`
  width: 296px;
  max-width: 296px;
  min-width: 296px;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    width: 100%;
    max-width: 100%;
    min-width: 100%;
  `};
`

export const BeneficialOwnersTableContainer = styled.div`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;
  `};
`

const RejectedIcon = styled(NonTradable)`
  ${({ theme }) =>
    theme.config.elements?.main &&
    css`
      circle {
        fill: ${theme.config.elements?.main};
      }
      path {
        fill: white;
      }
    `}
`
const AttentionIcon = styled(Attention)`
  ${({ theme }) =>
    theme.config.elements?.main &&
    css`
      > circle[fill='#ED0376'] {
        fill: ${theme.error};
      }
      > circle[stroke='#ED0376'] {
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

export const PassedIcon = styled(Passed)`
  ${({ theme }) =>
    theme.config.elements?.main &&
    css`
      > path {
        fill: ${theme.success};
      }
      > circle {
        fill: ${theme.config.elements?.main};
      }
    `}
`

export const StyledBigPassed = styled(BigPassed)`
  ${({ theme }) =>
    theme.config.elements?.main &&
    css`
      > path {
        fill: ${theme.success};
      }
      > circle {
        fill: ${theme.config.elements?.main};
      }
    `}
`

/* eslint-disable react/display-name */
export const KYCStatusIcons = {
  [KYCStatuses.PENDING]: () => <LoaderThin size={20} />,
  [KYCStatuses.APPROVED]: () => <PassedIcon />,
  [KYCStatuses.NOT_SUBMITTED]: () => null,
  [KYCStatuses.CHANGES_REQUESTED]: () => <AttentionIcon />,
  [KYCStatuses.REJECTED]: () => <RejectedIcon />,
  [KYCStatuses.DRAFT]: () => <LoaderThin size={20} />,
  [KYCStatuses.IN_PROGRESS]: () => <LoaderThin size={20} />,
  [KYCStatuses.FAILED]: () => <RejectedIcon />,
}

const KYCStatusText = {
  [KYCStatuses.PENDING]: t`Pending approval`,
  [KYCStatuses.APPROVED]: t`Approved`,
  [KYCStatuses.NOT_SUBMITTED]: t`Not submitted`,
  [KYCStatuses.CHANGES_REQUESTED]: t`Changes Requested`,
  [KYCStatuses.REJECTED]: t`Rejected`,
  [KYCStatuses.DRAFT]: t`Pending approval`,
  [KYCStatuses.IN_PROGRESS]: t`Pending approval`,
  [KYCStatuses.FAILED]: t`FAILED`,
}

const KYCStatusColors = {
  [KYCStatuses.PENDING]: 'text2',
  [KYCStatuses.APPROVED]: 'green1',
  [KYCStatuses.NOT_SUBMITTED]: 'error',
  [KYCStatuses.CHANGES_REQUESTED]: 'text1',
  [KYCStatuses.REJECTED]: 'error',
  [KYCStatuses.DRAFT]: 'text2',
  [KYCStatuses.IN_PROGRESS]: 'text2',
  [KYCStatuses.FAILED]: 'error',
}

const KYCStatusDescription = {
  [KYCStatuses.PENDING]:
    'Your KYC application has been received and will be processed by the team. Thank you for your patience.',
  [KYCStatuses.APPROVED]: null,
  [KYCStatuses.NOT_SUBMITTED]:
    'Pass KYC once and use it during all accreditations for Securities tokens. Reliable and quick. Submit your KYC, get approved and forget about bureaucracy.',
  [KYCStatuses.CHANGES_REQUESTED]:
    'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.',
  [KYCStatuses.REJECTED]:
    'Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Vivamus suscipit tortor eget felis porttitor volutpat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.',
  [KYCStatuses.DRAFT]:
    'Your KYC application has been received and will be processed by the team. Thank you for your patience.',
  [KYCStatuses.FAILED]: 'FAILED to submit kyc. Please contact support.',
  [KYCStatuses.IN_PROGRESS]:
    'Your KYC application has been received and will be processed by the team. Thank you for your patience.',
}

export const getStatusInfo = (status: KYCStatuses) => {
  return { icon: KYCStatusIcons[status], color: KYCStatusColors[status], text: KYCStatusText[status] }
}

export const getStatusDescription = (status: KYCStatuses) => {
  return KYCStatusDescription[status]
}

export const Divider = styled.div`
  height: 1px;
  background-color: ${({ theme: { text2 } }) => `${text2}50`};
  width: 100%;
  opacity: 0.2;
`

export const DateInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  color: ${({ theme: { text9 } }) => text9};
`
