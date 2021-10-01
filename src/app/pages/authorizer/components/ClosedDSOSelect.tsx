import React from 'react'
import { MenuItem, Select } from '@material-ui/core'
import { useDSOList } from 'app/pages/authorizer/hooks/useDSOList'

export const ClosedDSOSelect = (props: any) => {
  const { data } = useDSOList('Closed')

  return (
    <Select {...props}>
      <MenuItem value={undefined}>Closed DSO</MenuItem>
      {data.list.map(({ _id, tokenName }) => {
        return (
          <MenuItem value={_id} key={_id}>
            {tokenName}
          </MenuItem>
        )
      })}
    </Select>
  )
}
