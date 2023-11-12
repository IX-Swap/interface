import React, { useContext } from 'react'
import { Trans, t } from '@lingui/macro'
import styled, { ThemeContext } from 'styled-components'

import { KYCStatuses } from 'pages/KYC/enum'

import rejectedIcon from '../../assets/images/newReject.svg'
import changeRequestIcon from '../../assets/images/NewInfoIcon.svg'
import approvedIcon from '../../assets/images/newRightCheck.svg'
import pendingIcon from '../../assets/images/newPending.svg'
import warningIcon from '../../assets/images/warning.svg'

interface Props {
  status: string
}

export const StatusCell = ({ status }: Props) => {
  const theme = useContext(ThemeContext)
  const statusColors = {
    [KYCStatuses.PENDING]: theme.text2,
    [KYCStatuses.DRAFT]: theme.text2,
    [KYCStatuses.REJECTED]: theme.text2,
    [KYCStatuses.CHANGES_REQUESTED]: theme.text2,
    [KYCStatuses.APPROVED]: theme.text2,
    [KYCStatuses.FAILED]: theme.text2,
    [KYCStatuses.IN_PROGRESS]: theme.text2,
  } as Record<string, string>

  const getText = () => {
    switch (status) {
      case KYCStatuses.PENDING:
        return `Pending`
      case KYCStatuses.REJECTED:
        return `Declined`
      case KYCStatuses.CHANGES_REQUESTED:
        return `Change requested`
      case KYCStatuses.APPROVED:
        return `Approved`
      case KYCStatuses.DRAFT:
        return `Draft`
      case KYCStatuses.FAILED:
        return `Failed`
      case KYCStatuses.IN_PROGRESS:
        return `In progress`
      default:
        return `Status`
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
      <StatusText color={statusColors[status] || theme.text2} data-testid={getText()}>
        <Trans>{getText()}</Trans>
      </StatusText>
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
