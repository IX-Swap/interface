import React from 'react'
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
  TradingStatus
} from 'types/util'
import { Box } from '@mui/material'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import { useAuthorizerCategory } from 'hooks/location/useAuthorizerCategory'
import { BackhandIcon } from 'app/pages/authorizer/components/BackHandIcon'
import { useHistory } from 'react-router-dom'
import { StatusFilterItem } from './upgrade/StatusFilterItem'
export interface BaseStatusFilterProps {
  statusFilters: StatusFilterItemType[]
}

export const BaseStatusFilter = ({ statusFilters }: BaseStatusFilterProps) => {
  const { location } = useHistory()
  return (
    <>
      {location?.pathname?.includes('individuals') ||
      location?.pathname?.includes('corporates') ||
      location?.pathname?.includes('trading') ? (
        <SearchQueryFilter<'authorizationStatus'>
          name='authorizationStatus'
          defaultValue=''
        >
          {({ value, onChange }) => (
            <Box
              style={{
                display: 'flex',
                borderBottom: 'solid 1px #DBE2EC',
                height: '60px'
              }}
            >
              {statusFilters?.reverse()?.map((status, i) => (
                <StatusFilterItem
                  key={i}
                  title={status?.title}
                  isSelected={status?.value === value}
                  onClick={() => onChange(status.value)}
                  icon={status?.icon}
                />
              ))}
            </Box>
          )}
        </SearchQueryFilter>
      ) : (
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
      )}
    </>
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

export interface TradingStatusFilterProps {
  statusFilters: TradingStatusFilterItemType[]
}

export const TradingStatusFilter = ({
  statusFilters
}: TradingStatusFilterProps) => {
  return (
    <SearchQueryFilter<'tradingStatus'> name='tradingStatus' defaultValue=''>
      {({ value, onChange }) => (
        <Box style={{ display: 'flex', marginBottom: '10px' }}>
          {statusFilters?.map((status, i) => (
            <StatusFilterItem
              key={i}
              title={status?.title}
              isSelected={status?.value === value}
              onClick={() => onChange(status?.value)}
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
  console.log(category, 'catttt')
  if (category === 'commitments') {
    return <BaseFundStatusFilter statusFilters={fundStatusFilters} />
  }

  if (category === 'token-deployment') {
    return <DeploymentStatusFilter statusFilters={deploymentStatusFilter} />
  }
  if (category === 'trading') {
    return <TradingStatusFilter statusFilters={tradingStatusFilter} />
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

interface TradingStatusFilterItemType {
  icon: SvgIconComponent
  title: string
  value: TradingStatus
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

export const tradingStatusFilter: TradingStatusFilterItemType[] = [
  { icon: UnauthorizedIcon, value: '', title: 'All' },
  {
    icon: UnauthorizedIcon,
    value: 'Pending',
    title: 'Pending Approval'
  },
  {
    icon: UnauthorizedIcon,
    value: 'Matched',
    title: 'Matched'
  },
  {
    icon: UnauthorizedIcon,
    value: 'Filled',
    title: 'Filled'
  }
]