import React from 'react'
import { useDSOList } from 'app/pages/authorizer/hooks/useDSOList'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'

export const ClosedDSOSelect = (props: any) => {
  const { data } = useDSOList('Closed')

  return (
    <>
      <InputLabel>{props.label}</InputLabel>
      <Select placeholder={String(props.label)} {...props} label={undefined}>
        <SelectItem value={undefined}>Closed DSO</SelectItem>
        {data.list.map(({ _id, tokenName }) => {
          return (
            <SelectItem value={_id} key={_id}>
              {tokenName}
            </SelectItem>
          )
        })}
      </Select>
    </>
  )
}

ClosedDSOSelect.displayName = 'Select_ClosedDSOSelect'
