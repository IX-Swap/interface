import React from 'react'
import { MenuItem, Select } from '@material-ui/core'
import { useDSOsByUserId } from 'app/pages/issuance/hooks/useDSOsByUserId'

export const DSOSelect = (props: any): JSX.Element | null => {
  const { data, isIdle, isLoading } = useDSOsByUserId()

  if (isIdle || isLoading || data.list.length === 0) {
    return null
  }

  return (
    <Select {...props} style={{ minWidth: 80 }}>
      {data.list.map(({ _id, tokenName }) => (
        <MenuItem key={_id} value={_id}>
          {tokenName}
        </MenuItem>
      ))}
    </Select>
  )
}
