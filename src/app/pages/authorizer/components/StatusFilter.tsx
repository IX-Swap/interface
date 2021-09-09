import React from 'react'
import { StatusFilterItem } from 'app/pages/authorizer/components/StatusFilterItem'
import {
  Assignment as AllIcon,
  AssignmentTurnedIn as ApprovedIcon,
  ThumbDownOutlined as RejectedIcon,
  Subject as UnauthorizedIcon,
  TrackChanges as ClosedDealIcon,
  Warning as PendingApprovalIcon,
  SvgIconComponent
} from '@material-ui/icons'
import { AuthorizableStatus } from 'types/util'
import { Box } from '@material-ui/core'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'

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

export const StatusFilter = () => {
  return <BaseStatusFilter statusFilters={[...statusFilters, ...allFilter]} />
}

export const ColorStatusFilter = () => {
  return <BaseStatusFilter statusFilters={dsoStatusFilters} />
}
interface StatusFilterItemType {
  icon: SvgIconComponent
  title: string
  value: AuthorizableStatus
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
