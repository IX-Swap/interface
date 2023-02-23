import React from 'react'
import styled, { useTheme } from 'styled-components'
import { IssuanceStatus } from '../types'
import { OfferStatus } from 'state/launchpad/types'
import { text1 } from 'components/LaunchpadMisc/typography'
import { alpha } from '@material-ui/core'

interface BadgeProps {
  status?: IssuanceStatus | OfferStatus
}

export const MiniStatusBadge: React.FC<BadgeProps> = ({ status }) => {
  const theme = useTheme()

  switch (status) {
    case IssuanceStatus.approved:
    case OfferStatus.approved:
    case OfferStatus.whitelist:
    case OfferStatus.preSale:
    case OfferStatus.sale:
    case OfferStatus.closed:
    case OfferStatus.claim:
      return <MiniStatusBadgeWrapper color={theme.launchpad.colors.success}>Approved</MiniStatusBadgeWrapper>
    case IssuanceStatus.declined:
    case OfferStatus.declined:
      return <MiniStatusBadgeWrapper color={theme.launchpad.colors.error}>Rejected</MiniStatusBadgeWrapper>
    case IssuanceStatus.inProgress:
      return <MiniStatusBadgeWrapper color="#BFBFD2">Application in Progress</MiniStatusBadgeWrapper>
    case IssuanceStatus.changesRequested:
      return <MiniStatusBadgeWrapper color="#4C88FF">Update Requested</MiniStatusBadgeWrapper>
    case IssuanceStatus.pendingApproval:
    case OfferStatus.pendingApproval:
      return <MiniStatusBadgeWrapper color={theme.launchpad.colors.warn}>Pending Approval</MiniStatusBadgeWrapper>
    case IssuanceStatus.draft:
    case OfferStatus.draft:
    case undefined:
      return <div></div>
    default:
      return status
  }
}

const MiniStatusBadgeWrapper = styled.div<{ color: string }>`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;

  gap: 0.5rem;
  padding: 0 1rem;
  ${text1}
  height: 48px;
  width: 250px;

  font-family: ${(props) => props.theme.launchpad.font};

  color: ${(props) => props.color};
  border: 1px solid ${(props) => alpha(props.theme.launchpad.colors.primary, 0.2)};
  border-radius: 6px;
`
