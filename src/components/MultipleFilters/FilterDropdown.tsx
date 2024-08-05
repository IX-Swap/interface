import React, { CSSProperties, useCallback, useMemo } from 'react'
import { Trans, t } from '@lingui/macro'

import { RowCenter } from 'components/Row'
import { TYPE } from 'theme'
import { Checkbox } from 'components/Checkbox'
import { ReactComponent as ArrowDownIcon } from 'assets/images/arrow-down.svg'

import { DarkBlueCard, PopOverContent, StyledPopover, Icon } from './styleds'

interface Props {
  onSelect: (item: any) => void
  selectedItems: any[]
  items: any[]
  withScroll?: boolean
  placeholder: string
  style?: CSSProperties
  className?: string
}

export const FilterDropdown = ({ onSelect, selectedItems, items, placeholder, className }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null)

  const isOpen = Boolean(anchorEl)

  const options = useMemo(() => [{ label: 'All', value: 'all' }, ...items], [items])

  const handleOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

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
      <DarkBlueCard className={`dropdown ${className || ''}`} onClick={handleOpen} isOpen={isOpen || (selectedItems?.length ? true : false)}>
        <TYPE.main1
          color="#8F8FB2"
          fontWeight={300}
          overflow="hidden"
          style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
        >
          <Trans>{`${placeholder}`}</Trans>
        </TYPE.main1>
        <ArrowDownIcon />
      </DarkBlueCard>
      <StyledPopover
        elevation={0}
        open={isOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <PopOverContent>
          {options.map((item) => {
            return (
              <Checkbox
                key={item.value}
                checked={isChecked(item.value)}
                label={
                  <RowCenter style={{ fontWeight: isChecked(item.value) ? 700 : 400, color: '#8F8FB2', gap: 4 }}>
                    {item.icon && <Icon>{item.icon}</Icon>}
                    {item.label}
                  </RowCenter>
                }
                onClick={() => selectItem(item)}
              />
            )
          })}
        </PopOverContent>
      </StyledPopover>
    </>
  )
}
