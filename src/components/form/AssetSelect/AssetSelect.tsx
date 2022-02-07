import React from 'react'
import { AssetType } from 'types/asset'
import { useAssetsData } from 'hooks/asset/useAssetsData'
import { MenuItem, Select, SelectProps } from '@mui/material'
import { queryStatusRenderer } from 'components/form/renderUtils'

export interface AssetSelectProps {
  assetType?: AssetType
  limit?: number
}

export const AssetSelect = (
  props: AssetSelectProps & SelectProps
): JSX.Element => {
  const { assetType, label, limit, ...rest } = props
  const { status, data } = useAssetsData(assetType, limit)

  queryStatusRenderer(status)

  return (
    <Select {...rest} style={{ minWidth: 80 }} label={label}>
      <MenuItem disabled value={undefined}>
        {assetType}
      </MenuItem>
      {data.list.map(({ _id, numberFormat }) => (
        <MenuItem key={_id} value={_id}>
          {numberFormat.currency}
        </MenuItem>
      ))}
    </Select>
  )
}
