import React from 'react'
import { StatusFilterItem } from 'app/pages/authorizer/components/StatusFilterItem'
import {
  Assignment as AllIcon,
  AssignmentTurnedIn as ApprovedIcon,
  ThumbDownOutlined as RejectedIcon,
  Subject as UnauthorizedIcon,
  TrackChanges as ClosedDealIcon,
  Warning as PendingApprovalIcon,
  SwapHoriz as TransferredIcon,
  SvgIconComponent
} from '@material-ui/icons'
import { AuthorizableStatus, DeploymentStatus, FundStatus } from 'types/util'
import { Box } from '@material-ui/core'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import { useAuthorizerCategory } from 'hooks/location/useAuthorizerCategory'
import { BackhandIcon } from 'app/pages/authorizer/components/BackHandIcon'

export interface BaseStatusFilterProps {
  statusFilters: StatusFilterItemType[]
}

export const BaseStatusFilter = ({ statusFilters }: BaseStatusFilterProps) => {
  return (
    <SearchQueryFilter<'authorizationStatus'>
      name='authorizationStatus'
      defaultValue='Submitted'
    >
      {({ value, onChange }) => (
        <Box>
          {statusFilters.map((status, i) => (
            <StatusFilterItem
              key={i}
              title={status.title}
              isSelected={status.value === value}
              onClick={() => onChange(status.value)}
              icon={status.icon}
            />
          ))}
        </Box>
      )}
    </SearchQueryFilter>
  )
}

export interface BaseFundStatusFilterProps {
  statusFilters: FundStatusFilterItemType[]
}

export const BaseFundStatusFilter = ({
  statusFilters
}: BaseFundStatusFilterProps) => {
  return (
    <SearchQueryFilter<'fundStatus'>
      name='fundStatus'
      defaultValue='Funds on hold'
    >
      {({ value, onChange }) => (
        <Box>
          {statusFilters.map((status, i) => (
            <StatusFilterItem
              key={i}
              title={status.title}
              isSelected={status.value === value}
              onClick={() => onChange(status.value)}
              icon={status.icon}
            />
          ))}
        </Box>
      )}
    </SearchQueryFilter>
  )
}

export interface DeploymentStatusFilterProps {
  statusFilters: DeploymentStatusFilterItemType[]
}

export const DeploymentStatusFilter = ({
  statusFilters
}: DeploymentStatusFilterProps) => {
  return (
    <SearchQueryFilter<'deploymentStatus'>
      name='deploymentStatus'
      defaultValue=''
    >
      {({ value, onChange }) => (
        <Box>
          {statusFilters.map((status, i) => (
            <StatusFilterItem
              key={i}
              title={status.title}
              isSelected={status.value === value}
              onClick={() => onChange(status.value)}
              icon={status.icon}
            />
          ))}
        </Box>
      )}
    </SearchQueryFilter>
  )
}

export const StatusFilter = () => {
  const category = useAuthorizerCategory()
  if (category === 'commitments') {
    return <BaseFundStatusFilter statusFilters={fundStatusFilters} />
  }

  if (category === 'token-deployment') {
    return <DeploymentStatusFilter statusFilters={deploymentStatusFilter} />
  }
  return <BaseStatusFilter statusFilters={[...statusFilters, ...allFilter]} />
}

interface StatusFilterItemType {
  icon: SvgIconComponent
  title: string
  value: AuthorizableStatus
}

interface FundStatusFilterItemType {
  icon: SvgIconComponent
  title: string
  value: FundStatus
}

interface DeploymentStatusFilterItemType {
  icon: SvgIconComponent
  title: string
  value: DeploymentStatus
}

export const allFilter: StatusFilterItemType[] = [
  { icon: AllIcon, value: '', title: 'All' }
]

export const statusFilters: StatusFilterItemType[] = [
  {
    icon: UnauthorizedIcon,
    value: 'Submitted',
    title: 'Submitted'
  },
  {
    icon: ApprovedIcon,
    value: 'Approved',
    title: 'Approved'
  },
  {
    icon: RejectedIcon,
    value: 'Rejected',
    title: 'Rejected'
  }
]

export const dsoStatusFilters: StatusFilterItemType[] = [
  ...statusFilters,
  {
    icon: PendingApprovalIcon,
    value: 'Pending',
    title: 'Pending Approval'
  },
  {
    icon: ClosedDealIcon,
    value: 'Closed',
    title: 'Closed'
  },
  ...allFilter
]

export const fundStatusFilters: FundStatusFilterItemType[] = [
  { icon: UnauthorizedIcon, value: 'Not funded', title: 'Not Funded' },
  { icon: BackhandIcon as any, value: 'Funds on hold', title: 'Funds On Hold' },
  {
    icon: TransferredIcon,
    value: 'Funds transferred',
    title: 'Funds Transferred'
  },
  {
    icon: ClosedDealIcon,
    value: 'Settlement in Progress',
    title: 'Settlement in Progress'
  },
  { icon: RejectedIcon, value: 'Rejected', title: 'Rejected' },
  { icon: PendingApprovalIcon, value: 'Failed', title: 'Failed' },
  { icon: AllIcon, value: '', title: 'All' }
]

export const deploymentStatusFilter: DeploymentStatusFilterItemType[] = [
  {
    icon: ApprovedIcon,
    value: 'DEPLOYED',
    title: 'Deployed'
  },
  {
    icon: UnauthorizedIcon,
    value: 'PENDING',
    title: 'Pending'
  },
  { icon: AllIcon, value: '', title: 'All' }
]
