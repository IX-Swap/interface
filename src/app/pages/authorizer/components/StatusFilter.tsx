import React from 'react'
import { StatusFilterItem } from 'app/pages/authorizer/components/StatusFilterItem'
import {
  Assignment as AllIcon,
  AssignmentTurnedIn as ApprovedIcon,
  Gavel as RejectedIcon,
  Subject as UnauthorizedIcon,
  SvgIconComponent
} from '@material-ui/icons'
import { AuthorizableStatus } from 'types/util'
import { Box } from '@material-ui/core'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'

export const StatusFilter = () => {
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
interface StatusFilterItemType {
  icon: SvgIconComponent
  title: string
  value: AuthorizableStatus
}

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
  },
  { icon: AllIcon, value: '', title: 'All' }
]
