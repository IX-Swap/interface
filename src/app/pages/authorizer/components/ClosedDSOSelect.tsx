import React from 'react'
import { useDSOList } from 'app/pages/authorizer/hooks/useDSOList'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

export const ClosedDSOSelect = (props: any) => {
  const { data } = useDSOList('Closed')

  return (
    <Select {...props}>
      <SelectItem value={undefined}>Closed DSO</SelectItem>
      {data.list.map(({ _id, tokenName }) => {
        return (
          <SelectItem value={_id} key={_id}>
            {tokenName}
          </SelectItem>
        )
      })}
    </Select>
  )
}
