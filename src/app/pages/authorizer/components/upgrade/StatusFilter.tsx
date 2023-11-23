import React from 'react'
import { StatusFilterItem } from './StatusFilterItem'
import {
  Assignment as AllIcon,
  AssignmentTurnedIn as ApprovedIcon,
  ThumbDownOutlined as RejectedIcon,
  Subject as UnauthorizedIcon,
  TrackChanges as ClosedDealIcon,
  Warning as PendingApprovalIcon,
  SwapHoriz as TransferredIcon,
  SvgIconComponent
} from '@mui/icons-material'
import {
  AuthorizableStatus,
  DeploymentStatus,
  FundStatus,
  OtcTradesStatus,
  STOWithdrawalStatus
} from 'types/util'
import { Box } from '@mui/material'
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
      defaultValue=''
    >
      {({ value, onChange }) => (
        <Box
          style={{
            display: 'flex',
            // borderBottom: 'solid 1px #DBE2EC',
            height: '60px'
          }}
        >
          {statusFilters?.map((status, i) => (
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
        <Box
          style={{
            display: 'flex',
            // borderBottom: 'solid 1px #DBE2EC',
            height: '60px'
          }}
        >
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
        <Box
          style={{
            display: 'flex',
            // borderBottom: 'solid 1px #DBE2EC',
            height: '60px'
          }}
        >
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
    return (
      <BaseFundStatusFilter statusFilters={[...fundStatusFilters].reverse()} />
    )
  }

  if (category === 'token-deployment') {
    return (
      <DeploymentStatusFilter
        statusFilters={[...deploymentStatusFilter].reverse()}
      />
    )
  }

  if (category === 'security-token-withdrawals') {
    // @ts-expect-error
    return <BaseStatusFilter statusFilters={stoWithdrawalStatusFilter} />
  }

  if (category === 'otc-trades') {
    // @ts-expect-error
    return <BaseStatusFilter statusFilters={otcTradesStatusFilter} />
  }

  if (
    category === 'corporates' ||
    category === 'individuals' ||
    category === 'offerings'
  ) {
    return <BaseStatusFilter statusFilters={investorStatusFilter} />
  }

  return <BaseStatusFilter statusFilters={[...allFilter, ...statusFilters]} />
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

interface STOWithdrawalStatusFilterItemType {
  icon: SvgIconComponent
  title: string
  value: STOWithdrawalStatus
}

interface OtcTradesStatusFilterItemType {
  icon: SvgIconComponent
  title: string
  value: OtcTradesStatus
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

export const investorStatusFilter: StatusFilterItemType[] = [
  ...allFilter,
  ...statusFilters,
  {
    icon: RejectedIcon,
    value: 'Draft',
    title: 'Draft'
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

export const otcTradesStatusFilter: OtcTradesStatusFilterItemType[] = [
  { icon: AllIcon, value: '', title: 'All' },
  {
    icon: UnauthorizedIcon,
    value: 'NEW',
    title: 'Confirmed'
  },
  {
    icon: ApprovedIcon,
    value: 'COMPLETED',
    title: 'Settled'
  },

  {
    icon: UnauthorizedIcon,
    value: 'REJECTED',
    title: 'Rejected'
  }
]

export const stoWithdrawalStatusFilter: STOWithdrawalStatusFilterItemType[] = [
  // @ts-expect-error
  ...allFilter,
  // @ts-expect-error
  ...statusFilters,
  {
    icon: RejectedIcon,
    // @ts-expect-error
    value: 'Error',
    title: 'Error'
  },
  {
    icon: RejectedIcon,
    // @ts-expect-error
    value: 'Success',
    title: 'Success'
  }
]
