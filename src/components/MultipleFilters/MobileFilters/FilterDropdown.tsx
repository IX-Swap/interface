import React, { CSSProperties, useCallback, useMemo } from 'react'

import { RowCenter } from 'components/Row'
import { Checkbox } from 'components/Checkbox'

import { Icon } from '../styleds'

interface Props {
  onSelect: (item: any) => void
  selectedItems: any[]
  items: any[]
  withScroll?: boolean
  placeholder: string
  style?: CSSProperties
  className?: string
}

export const FilterDropdown = ({ onSelect, selectedItems, items }: Props) => {
  const options = useMemo(() => [{ label: 'All', value: 'all' }, ...items], [items])

  const selectItem = useCallback(
    (item: any) => {
      if (item.value === 'all' && selectedItems.length !== items.length) {
        onSelect(items)
      } else {
        onSelect(item)
      }
    },
    [onSelect, items, selectedItems]
  )

  const isChecked = (value: string) => {
    if (value === 'all') {
      return selectedItems.length === items.length
    }
    return Boolean(selectedItems.find((el) => el.value === value))
  }

  return (
    <>
      {options.map((item) => {
        return (
          <Checkbox
            key={item.value}
            checked={isChecked(item.value)}
            label={
              <RowCenter style={{ fontWeight: isChecked(item.value) ? 700 : 400, color: 'white', gap: 4 }}>
                {item.icon && <Icon>{item.icon}</Icon>}
                {item.label}
              </RowCenter>
            }
            onClick={() => selectItem(item)}
          />
        )
      })}
    </>
  )
}
