import { SelectProps } from '@mui/material'
import { queryStatusRenderer } from 'components/form/renderUtils'
import { renderValue } from 'helpers/forms'
import { useAssetsData } from 'hooks/asset/useAssetsData'
import React from 'react'
import { Asset, AssetType } from 'types/asset'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

export interface AssetSelectProps {
  assetType?: AssetType
  limit?: number
}

export const AssetSelect = (
  props: AssetSelectProps & SelectProps
): JSX.Element => {
  const { assetType, label, limit, ...rest } = props
  const { status, data } = useAssetsData(assetType, limit)
  const renderName = (value: any) => {
    return renderValue({
      value,
      list: data?.list,
      extractor: (item: Asset) => item.numberFormat.currency
    })
  }
  queryStatusRenderer(status)

  return (
    <>
      <InputLabel>{props.label}</InputLabel>
      <Select
        {...rest}
        style={{ minWidth: 80 }}
        placeholder={String(props.label)}
        displayEmpty
        renderValue={renderName}
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
