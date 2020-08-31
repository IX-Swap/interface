import React from 'react'
import { MenuItem, Select, SelectProps } from '@material-ui/core'
import { useAssets } from 'v2/context/assets/useAssets'

export interface AssetsSelectProps {
  type: 'Currency' | 'Security'
}

export const AssetsSelect: React.FC<
  AssetsSelectProps & SelectProps
> = props => {
  const { type, ...rest } = props
  const { status, data } = useAssets(type)

  if (status === 'loading') {
    return <div>loading...</div>
  }

  if (status === 'error') {
    return <div>error...</div>
  }
  return (
    <Select {...rest}>
      <MenuItem disabled value={undefined}>
        {type}
      </MenuItem>
      {data.list.map(({ _id, numberFormat }) => (
        <MenuItem key={_id} value={_id}>
          {numberFormat.currency}
        </MenuItem>
      ))}
    </Select>
  )
}
