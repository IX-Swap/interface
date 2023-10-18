import React from 'react'
import styled, { useTheme } from 'styled-components'

import { ReactComponent as Checked } from 'assets/images/newRightCheck.svg'
import { ReactComponent as CloseIcon } from 'assets/images/newCloseIcon.svg'
import { ReactComponent as NewPending } from 'assets/images/newPending.svg'
import { ReactComponent as NewInfoIcon } from 'assets/images/NewInfoIcon.svg'
import { ReactComponent as InProgress } from 'assets/images/InProgressNew.svg'

import { IssuanceStatus } from '../types'

interface BadgeProps {
  status?: IssuanceStatus
  isDeployed?: boolean
}

export const IssuanceStatusBadge: React.FC<BadgeProps> = ({ status, isDeployed }) => {
  const theme = useTheme()

  switch (status) {
    case IssuanceStatus.approved:
      return (
        <IssuanceStatusBadgeWrapper color="">
          <Checked /> {isDeployed ? 'Deployed' : 'Approved'}
        </IssuanceStatusBadgeWrapper>
      )
    case IssuanceStatus.declined:
      return (
        <IssuanceStatusBadgeWrapper color="">
          <CloseIcon />
          Rejected
        </IssuanceStatusBadgeWrapper>
      )
    case IssuanceStatus.draft:
    case IssuanceStatus.inProgress:
      return (
        <IssuanceStatusBadgeWrapper color="">
          <InProgress />
          Application in Progress
        </IssuanceStatusBadgeWrapper>
      )
    case IssuanceStatus.changesRequested:
      return (
        <IssuanceStatusBadgeWrapper color="">
          <NewInfoIcon />
          Update Requested
        </IssuanceStatusBadgeWrapper>
      )
    case IssuanceStatus.pendingApproval:
      return (
        <IssuanceStatusBadgeWrapper color="">
          <NewPending />
          Pending Approval
        </IssuanceStatusBadgeWrapper>
      )
    case undefined:
      return <div></div>
    default:
      return status
  }
}

const IssuanceStatusBadgeWrapper = styled.div<{ color: string }>`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;

  gap: 0.5rem;
  padding: 0 1rem;

  height: 34px;
  width: max-content;

  font-family: ${(props) => props.theme.launchpad.font};

  color: ${(props) => props.color};
  // border: 1px solid ${(props) => props.color};
  border-radius: 6px;
`
