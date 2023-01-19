import React from "react"
import styled, { useTheme } from "styled-components"

import { Check } from "react-feather"

import { IssuanceStatus } from "../types"

interface BadgeProps {
  status: IssuanceStatus
}

export const IssuanceStatusBadge: React.FC<BadgeProps> = (props) => {
  const theme = useTheme()

  switch (props.status) {
    case IssuanceStatus.approved:
      return (
        <IssuanceStatusBadgeWrapper color={theme.launchpad.colors.success}>
          Approved <Check size="15" />
        </IssuanceStatusBadgeWrapper>
      )
    case IssuanceStatus.declined:
      return (
        <IssuanceStatusBadgeWrapper color={theme.launchpad.colors.error}>
          Rejected
        </IssuanceStatusBadgeWrapper>
      )
    case IssuanceStatus.inProgress:
      return (
        <IssuanceStatusBadgeWrapper color="#BFBFD2">
          Application in Progress
        </IssuanceStatusBadgeWrapper>
      )
    case IssuanceStatus.changesRequested:
      return (
        <IssuanceStatusBadgeWrapper color="#4C88FF">
          Update Your Application
        </IssuanceStatusBadgeWrapper>
      )
    case IssuanceStatus.pendingApproval:
      return (
        <IssuanceStatusBadgeWrapper color="#FFC632">
          Pending Approval
        </IssuanceStatusBadgeWrapper>
      )
    case IssuanceStatus.draft:
      return (<div></div>)
    default:
      return props.status
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

  color: ${props => props.color};
  border: 1px solid ${props => props.color + '1e'};
  border-radius: 6px;
`

