import { SelectProps } from '@mui/material'
import { privateClassNames } from 'helpers/classnames'
import { renderValue } from 'helpers/forms'
import React from 'react'
import { Network } from 'types/networks'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

export const ProductSpecification = (props: SelectProps): JSX.Element => {
  const data = [{ name: 'Product Specification', _id: '' }]
  const renderName = (value: any) => {
    return renderValue({
      value,
      list: data,
      extractor: (item: Network) => item.name
    })
  }
  return (
    <>
      <InputLabel>{props.label}</InputLabel>
      <Select
        {...props}
        label={undefined}
        placeholder={String(props.label)}
        displayEmpty
        renderValue={renderName}
        style={{ minWidth: 70 }}
        data-testid='product-ppecification-select'
        defaultValue={undefined}
      >
        <SelectItem disabled value={undefined}>
          Product Specification
        </SelectItem>
        {data?.map(({ name, _id }) => (
          <SelectItem key={_id} value={_id} className={privateClassNames()}>
            {name}
          </SelectItem>
        ))}
      </Select>
    </>
  )
}

ProductSpecification.displayName = 'Select_ProductSpecification'
