import { isMobile } from 'react-device-detect'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'

import Popover from 'components/Popover'
import { RowBetween, RowStart } from 'components/Row'
import { TYPE } from 'theme'
import { ChevronElement } from 'components/ChevronElement'
import { DarkBlueCard } from 'components/Card'

export const PopOverContent = styled.div`
  display: flex;
  gap: 6px;
  flex-direction: column;
  padding: 15px 20px;
`

export const Dropdown = ({
  onSelect,
  selectedItem,
  items,
}: {
  onSelect: (item: any) => void
  selectedItem: any
  items: any[]
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
      height="60px"
      onClick={() => setIsOpen(!isOpen)}
      style={{ cursor: 'pointer' }}
    >
      <RowBetween>
        <RowBetween>
          <RowStart>
            <TYPE.body2>{selectedItem?.name || 'Choose'}</TYPE.body2>
          </RowStart>
        </RowBetween>
        <Popover show={isOpen} content={popOverContent()} placement="bottom-end" close={close}>
          <ChevronElement showMore={isOpen} />
        </Popover>
      </RowBetween>
    </DarkBlueCard>
  )
}
