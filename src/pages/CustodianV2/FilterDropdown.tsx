import { isMobile } from 'react-device-detect'
import React, { CSSProperties, useCallback, useState } from 'react'
import styled from 'styled-components'

import Popover from 'components/Popover'
import { RowBetween, RowStart } from 'components/Row'
import { TYPE } from 'theme'
import { DarkBlueCard } from 'components/Card'

export const PopOverContent = styled.div`
  display: flex;
  gap: 6px;
  flex-direction: column;
  padding: 15px 20px;
`

export const FilterDropdown = ({
  onSelect,
  selectedItem,
  items,
  placeholder,
  withScroll = false,
  style = {},
}: {
  onSelect: (item: any) => void
  selectedItem: any
  items: any[]
  withScroll?: boolean
  placeholder: string
  style?: CSSProperties
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)
  const selectItem = useCallback(
    (item: any) => {
      onSelect(item)
      close()
    },
    [onSelect]
  )

  const popOverContent = useCallback(() => {
    return (
      <PopOverContent style={{ cursor: 'pointer', width: isMobile ? '100%' : '320px' }}>
        {items.map((item) => {
          return (
            <RowStart key={`custodian-${item.id}`} onClick={() => selectItem(item)}>
              {item.name}
            </RowStart>
          )
        })}
      </PopOverContent>
    )
  }, [items, selectItem])

  return (
    <DarkBlueCard
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="60px"
      width="132px"
      onClick={() => setIsOpen(!isOpen)}
      style={{ cursor: 'pointer', padding: 10, ...style }}
    >
      <TYPE.body2 fontWeight={300} overflow="hidden" style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {selectedItem?.name || placeholder}
      </TYPE.body2>
      <Popover
        style={withScroll ? { maxHeight: 300, overflow: 'scroll' } : {}}
        show={isOpen}
        content={popOverContent()}
        placement="bottom-end"
        close={close}
      >
        {null}
      </Popover>
    </DarkBlueCard>
  )
}
