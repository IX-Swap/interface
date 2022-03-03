import React, { useCallback, useState } from 'react'
import { t } from '@lingui/macro'
import styled from 'styled-components'

import { ChevronElement } from 'components/ChevronElement'
import Popover from 'components/Popover'
import { RowBetween, RowStart } from 'components/Row'
import useTheme from 'hooks/useTheme'
import { useNFTState } from 'state/nft/hooks'
import { NFTCollection } from 'state/nft/types'
import { TYPE } from 'theme'

import { StyledSelect } from './styleds'

export const PopOverContent = styled.div`
  display: flex;
  gap: 6px;
  flex-direction: column;
  padding: 15px 20px;
`

export const CollectionDropdown = ({
  onSelect,
  selectedCollection,
  newCollectionName,
}: {
  onSelect: (collection: NFTCollection) => void
  selectedCollection: NFTCollection | null
  newCollectionName: string
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const theme = useTheme()
  const close = () => setIsOpen(false)
  const { myCollections } = useNFTState()
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
        {myCollections.map((collection) => {
          return (
            <RowStart key={collection.address} onClick={() => selectCollection(collection)}>
              {collection.name}
            </RowStart>
          )
        })}
      </PopOverContent>
    )
  }, [selectCollection, theme.text2, myCollections])

  return (
    <StyledSelect onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer' }}>
      <RowBetween>
        <RowBetween>
          {(myCollections.length || newCollectionName) && (
            <RowStart>
              <TYPE.body2>{selectedCollection?.name || newCollectionName || t`New Collection`}</TYPE.body2>
            </RowStart>
          )}
        </RowBetween>
        {myCollections.length > 0 && (
          <Popover show={isOpen} content={popOverContent()} placement="bottom-end" close={close}>
            <ChevronElement showMore={isOpen} />
          </Popover>
        )}
      </RowBetween>
    </StyledSelect>
  )
}
