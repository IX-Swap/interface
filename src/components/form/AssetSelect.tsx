import React from 'react'
import { AssetType } from 'types/asset'
import { useAssetsData } from 'hooks/asset/useAssetsData'
import { MenuItem, Select } from '@material-ui/core'
import { queryStatusRenderer } from 'components/form/renderUtils'

export interface AssetSelectProps {
  assetType?: AssetType
}

export const AssetSelect = (props: AssetSelectProps): JSX.Element => {
  const { assetType, ...rest } = props
  const { status, data } = useAssetsData(assetType)

  queryStatusRenderer(status)

  return (
    <Select {...rest} style={{ minWidth: 80 }}>
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
