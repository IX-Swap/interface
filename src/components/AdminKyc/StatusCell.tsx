import { t, Trans } from '@lingui/macro'
import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import rejectedIcon from '../../assets/images/reject.svg'
import changeRequestIcon from '../../assets/images/attention-white.svg'
import approvedIcon from '../../assets/images/check-success.svg'
import pendingIcon from '../../assets/images/loader_thin.svg'

export const KYC_STATUSES = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  CHANGE_REQUEST: 'changes requested',
}

interface Props {
  status: string
}

export const StatusCell = ({ status }: Props) => {
  const theme = useContext(ThemeContext)
  const statusColors = {
    [KYC_STATUSES.PENDING]: theme.text2,
    [KYC_STATUSES.REJECTED]: theme.error,
    [KYC_STATUSES.CHANGE_REQUEST]: theme.text2,
    [KYC_STATUSES.APPROVED]: theme.green1,
  } as Record<string, string>

  const getText = () => {
    switch (status) {
      case KYC_STATUSES.PENDING:
        return t`Pending`
      case KYC_STATUSES.REJECTED:
        return t`Declined`
      case KYC_STATUSES.CHANGE_REQUEST:
        return t`Change requested`
      case KYC_STATUSES.APPROVED:
        return t`Approved`
      default:
        return t`Status`
    }
  }

  const getIcon = () => {
    switch (status) {
      case KYC_STATUSES.REJECTED:
        return rejectedIcon
      case KYC_STATUSES.APPROVED:
        return approvedIcon
      case KYC_STATUSES.PENDING:
        return pendingIcon
      case KYC_STATUSES.CHANGE_REQUEST:
        return changeRequestIcon
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
