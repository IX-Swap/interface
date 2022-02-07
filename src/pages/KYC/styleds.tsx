import styled from 'styled-components'
import { Flex } from 'rebass'
import React from 'react'
import { t } from '@lingui/macro'

import Card from 'components/Card'
import { cardCommonStyles } from 'pages/CustodianV2/styleds'
import { LoaderThin } from 'components/Loader/LoaderThin'

import { KYCStatuses } from './enum'
import { ReactComponent as Attention } from 'assets/images/attention.svg'
import { ReactComponent as Passed } from 'assets/images/check-success.svg'
import { ReactComponent as NonTradable } from 'assets/images/reject.svg'

export const StatusCard = styled(Card)`
  display: flex;
  justify-content: center;
  background: ${({ theme }) => theme.bgG13};
  width: 100%;
  height: 630px;
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
/* eslint-disable react/display-name */
export const KYCStatusIcons = {
  [KYCStatuses.PENDING]: () => <LoaderThin size={20} />,
  [KYCStatuses.APPROVED]: () => <Passed />,
  [KYCStatuses.NOT_SUBMITTED]: () => null,
  [KYCStatuses.CHANGES_REQUESTED]: () => <Attention />,
  [KYCStatuses.REJECTED]: () => <NonTradable />,
}

const KYCStatusText = {
  [KYCStatuses.PENDING]: t`Pending approval`,
  [KYCStatuses.APPROVED]: t`Approved`,
  [KYCStatuses.NOT_SUBMITTED]: t`Not submitted`,
  [KYCStatuses.CHANGES_REQUESTED]: t`Changes Requested`,
  [KYCStatuses.REJECTED]: t`Rejected`,
}

const KYCStatusColors = {
  [KYCStatuses.PENDING]: 'text2',
  [KYCStatuses.APPROVED]: 'green1',
  [KYCStatuses.NOT_SUBMITTED]: 'error',
  [KYCStatuses.CHANGES_REQUESTED]: 'text1',
  [KYCStatuses.REJECTED]: 'error',
}

const KYCStatusDescription = {
  [KYCStatuses.PENDING]:
    'Pass KYC once and use it during all accreditations for Securities tokens. Reliable and quick. Submit your KYC, get approved and forget about bureaucracy.',
  [KYCStatuses.APPROVED]: null,
  [KYCStatuses.NOT_SUBMITTED]:
    'Pass KYC once and use it during all accreditations for Securities tokens. Reliable and quick. Submit your KYC, get approved and forget about bureaucracy.',
  [KYCStatuses.CHANGES_REQUESTED]:
    'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.',
  [KYCStatuses.REJECTED]:
    'Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Vivamus suscipit tortor eget felis porttitor volutpat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.',
}

export const getStatusInfo = (status: KYCStatuses) => {
  return { icon: KYCStatusIcons[status], color: KYCStatusColors[status], text: KYCStatusText[status] }
}

export const getStatusDescription = (status: KYCStatuses) => {
  return KYCStatusDescription[status]
}
