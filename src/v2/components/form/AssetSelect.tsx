import React from 'react'
import { AssetType } from 'v2/services/assets/types'
import { useAssetsData } from 'v2/hooks/asset/useAssetsData'
import { MenuItem, Select } from '@material-ui/core'
import { queryStatusRenderer } from 'v2/components/form/renderUtils'

export interface AssetSelectProps {
  assetType: AssetType
}

export const AssetSelect = React.memo(
  (props: AssetSelectProps): JSX.Element => {
    const { assetType, ...rest } = props
    const { status, data } = useAssetsData(assetType)

    queryStatusRenderer(status)

    return (
      <Select {...rest}>
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
  },
  () => false
)
