import React, { useContext } from 'react'
import { t } from '@lingui/macro'
import styled, { ThemeContext } from 'styled-components'

import { KYCStatuses } from 'pages/KYC/enum'

import rejectedIcon from '../../assets/images/reject.svg'
import changeRequestIcon from '../../assets/images/attention-white.svg'
import approvedIcon from '../../assets/images/check-success.svg'
import pendingIcon from '../../assets/images/loader_thin.svg'
import warningIcon from '../../assets/images/warning.svg'

interface Props {
  status: string
}

export const StatusCell = ({ status }: Props) => {
  const theme = useContext(ThemeContext)
  const statusColors = {
    [KYCStatuses.PENDING]: theme.text2,
    [KYCStatuses.DRAFT]: theme.text2,
    [KYCStatuses.REJECTED]: theme.error,
    [KYCStatuses.CHANGES_REQUESTED]: theme.text2,
    [KYCStatuses.APPROVED]: theme.green1,
    [KYCStatuses.FAILED]: theme.error,
    [KYCStatuses.IN_PROGRESS]: theme.text2,
  } as Record<string, string>

  const getText = () => {
    switch (status) {
      case KYCStatuses.PENDING:
        return t`Pending`
      case KYCStatuses.REJECTED:
        return t`Declined`
      case KYCStatuses.CHANGES_REQUESTED:
        return t`Change requested`
      case KYCStatuses.APPROVED:
        return t`Approved`
      case KYCStatuses.DRAFT:
        return t`Draft`
      case KYCStatuses.FAILED:
        return t`Failed`
      case KYCStatuses.IN_PROGRESS:
        return t`In progress`
      default:
        return t`Status`
    }
  }

  const getIcon = () => {
    switch (status) {
      case KYCStatuses.REJECTED:
        return rejectedIcon
      case KYCStatuses.APPROVED:
        return approvedIcon
      case KYCStatuses.PENDING:
        return pendingIcon
      case KYCStatuses.CHANGES_REQUESTED:
        return changeRequestIcon
      case KYCStatuses.DRAFT:
        return warningIcon
      case KYCStatuses.FAILED:
        return rejectedIcon
      case KYCStatuses.IN_PROGRESS:
        return warningIcon
      default:
        return pendingIcon
    }
  }

  return (
    <Container>
      <img src={getIcon()} alt="icon" width="20px" height="20px" />
      <StatusText color={statusColors[status] || theme.text2}>{getText()}</StatusText>
    </Container>
  )
}

const StatusText = styled.div<{ color: string }>`
  color: ${({ color }) => color};
`

const Container = styled.div`
  display: grid;
  grid-template-columns: 20px 90px 110px;
  grid-gap: 9px;
  align-items: center;
`
