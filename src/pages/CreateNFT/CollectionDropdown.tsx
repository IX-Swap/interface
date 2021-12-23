import { VioletCard } from 'components/Card'
import { ChevronElement } from 'components/ChevronElement'
import Popover from 'components/Popover'
import { RowBetween, RowStart } from 'components/Row'
import React, { useCallback, useState } from 'react'
import { NFTCollection } from 'state/nft/types'
import styled from 'styled-components'
import { TYPE } from 'theme'
import { collections } from './mocks'

export const PopOverContent = styled.div`
  display: flex;
  gap: 6px;
  flex-direction: column;
  padding: 15px 20px;
`

export const CollectionDropdown = ({
  onSelect,
  selectedCollection,
}: {
  onSelect: (collection: NFTCollection) => void
  selectedCollection: NFTCollection
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)
  const selectCollection = useCallback(
    (collection: NFTCollection) => {
      onSelect(collection)
      close()
    },
    [onSelect]
  )
  const popOverContent = useCallback(() => {
    return (
      <PopOverContent style={{ cursor: 'pointer', width: '320px' }}>
        {collections.map((collection) => {
          return (
            <RowStart key={collection.address} onClick={() => selectCollection(collection)}>
              {collection.name}
            </RowStart>
          )
        })}
      </PopOverContent>
    )
  }, [selectCollection])

  return (
    <VioletCard onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer' }}>
      <RowBetween>
        <RowBetween>
          <RowStart>
            <TYPE.body2>{selectedCollection.name}</TYPE.body2>
          </RowStart>
        </RowBetween>
        <Popover show={isOpen} content={popOverContent()} placement="bottom-end" close={close}>
          <ChevronElement showMore={isOpen} />
        </Popover>
      </RowBetween>
    </VioletCard>
  )
}
