import { BaseFilter, TableColumn } from 'types/util'
import React from 'react'
import { AuthorizableStatus } from 'app/pages/authorizer/components/AuthorizableStatus'
import { Box } from '@mui/material'
import { Status } from 'ui/Status/Status'
import { Actions } from 'app/pages/authorizer/components/Actions'
import { capitalizeFirstLetter } from 'helpers/strings'
import { Tooltip } from 'ui/Tooltip/Tooltip'

export interface AuthorizerViewReturnValue<T> {
  item: T | undefined
  isViewing: boolean
  filter: BaseFilter
  setFilter: (filter: Partial<BaseFilter>) => void
  setItem: (item?: T) => void
  getColumns: () => Array<TableColumn<T>>
  onBack: () => void
}

export const renderStatusColumn = (s: string): JSX.Element => (
  <AuthorizableStatus status={s} isNewTheme compact={false} />
)

export const renderStatus = (s: string): JSX.Element => (
  <Status label={capitalizeFirstLetter(s)} type={s.toLowerCase()} />
)

export const renderStatusColumnWithApproval = (row: any, status: string) => {
  const endAdornment =
    row?.requireYubikeyApproval === true ? (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginLeft: '8px'
        }}
      >
        <Tooltip
          title={
            <div>
              This transaction requires yubikey holders to approve transaction
              on the <strong>HEXSafe Desktop App</strong>.
            </div>
          }
          placement='bottom'
        />
      </div>
    ) : (
      <Actions item={row} cacheQueryKey={''} />
    )

  return (
    <Box display={'flex'} justifyContent={''}>
      <Status
        label={capitalizeFirstLetter(status)}
        type={status.toLowerCase()}
      />
      {endAdornment}
    </Box>
  )
}

export const renderDealStatus = (status: string): JSX.Element => {
  // return <AuthorizableStatus status={status} isNewTheme compact={false} />
  return typeof status !== 'undefined' ? (
    <Status label={status} type={status.toLowerCase()} />
  ) : (
    <></>
  )
}

export const statusColumn: TableColumn<any> = {
  key: 'status',
  label: 'Status',
  render: renderStatusColumn
}

export const initialFilterValue: BaseFilter = {
  status: 'Submitted'
}

export const statusColumnWithActions: TableColumn<any> = {
  key: 'status',
  label: 'Status',
  render: (status, row) => renderStatusColumnWithApproval(row, status)
}
