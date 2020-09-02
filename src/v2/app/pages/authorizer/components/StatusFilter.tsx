import { StatusFilterItem } from 'v2/app/pages/authorizer/components/StatusFilterItem'
import React, { useState } from 'react'
import {
  Assignment as AllIcon,
  AssignmentTurnedIn as ApprovedIcon,
  Gavel as RejectedIcon,
  Subject as UnauthorizedIcon,
  SvgIconComponent
} from '@material-ui/icons'
import { AuthorizableStatus, BaseFilter } from 'v2/types/util'

interface StatusFilterItemType {
  icon: SvgIconComponent
  title: string
  value: AuthorizableStatus
}

interface StatusFilterProps {
  onChange: (filter: BaseFilter) => void
}

export const StatusFilter: React.FC<StatusFilterProps> = props => {
  const { onChange } = props
  const [selectedStatus, setSelectedStatus] = useState<StatusFilterItemType>(
    statusFilters[3]
  )
  const renderItem = (status: StatusFilterItemType, i: number): JSX.Element => {
    const { value, icon, title } = status
    const handleClick = (): void => {
      setSelectedStatus(status)
      onChange({ status: status.value })
    }

    return (
      <StatusFilterItem
        key={i}
        title={title}
        isSelected={selectedStatus.value === value}
        onClick={handleClick}
      >
        {React.createElement(icon)}
      </StatusFilterItem>
    )
  }

  return <>{statusFilters.map(renderItem)}</>
}

export const statusFilters: StatusFilterItemType[] = [
  {
    icon: UnauthorizedIcon,
    value: 'Unauthorized',
    title: 'Unauthorized'
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
  { icon: () => <AllIcon />, value: '', title: 'All' }
]
