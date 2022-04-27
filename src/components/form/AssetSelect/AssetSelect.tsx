import React from 'react'
import { AssetType } from 'types/asset'
import { useAssetsData } from 'hooks/asset/useAssetsData'
import { SelectProps } from '@mui/material'
import { queryStatusRenderer } from 'components/form/renderUtils'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'

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
    <>
      <InputLabel>{props.label}</InputLabel>
      <Select
        {...rest}
        style={{ minWidth: 80 }}
        placeholder={String(props.label)}
        displayEmpty
        label={undefined}
      >
        <SelectItem disabled value={undefined}>
          {assetType}
        </SelectItem>
        {data.list.map(({ _id, numberFormat }) => (
          <SelectItem key={_id} value={_id}>
            {numberFormat.currency}
          </SelectItem>
        ))}
      </Select>
    </>
  )
}
AssetSelect.displayName = 'Select_AssetSelect'
