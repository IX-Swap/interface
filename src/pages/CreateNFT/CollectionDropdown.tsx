import { t, Trans } from '@lingui/macro'
import { VioletCard } from 'components/Card'
import { ChevronElement } from 'components/ChevronElement'
import Popover from 'components/Popover'
import { RowBetween, RowStart } from 'components/Row'
import useTheme from 'hooks/useTheme'
import React, { useCallback, useState } from 'react'
import { Plus } from 'react-feather'
import { useNFTState } from 'state/nft/hooks'
import { NFTCollection } from 'state/nft/types'
import styled from 'styled-components'
import { TYPE } from 'theme'

export const PopOverContent = styled.div`
  display: flex;
  gap: 6px;
  flex-direction: column;
  padding: 15px 20px;
`

export const CollectionDropdown = ({
  onSelect,
  selectedCollection,
  onSelectCreateCollection,
  newCollectionName,
}: {
  onSelect: (collection: NFTCollection) => void
  selectedCollection: NFTCollection | null
  onSelectCreateCollection: () => void
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
        <RowStart onClick={onSelectCreateCollection} style={{ gap: '5px' }}>
          <Plus size="16" color={theme.text2} />
          <TYPE.body2 style={{ fontWeight: 600 }}>
            <Trans>Create a new collection</Trans>
          </TYPE.body2>
        </RowStart>
      </PopOverContent>
    )
  }, [selectCollection, onSelectCreateCollection, theme.text2, myCollections])

  return (
    <VioletCard onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer' }}>
      <RowBetween>
        <RowBetween>
          {(myCollections.length || newCollectionName) && (
            <RowStart>
              <TYPE.body2>{selectedCollection?.name || newCollectionName || t`New Collection`}</TYPE.body2>
            </RowStart>
          )}
          {!(myCollections.length || newCollectionName) && (
            <RowStart onClick={onSelectCreateCollection}>
              <TYPE.body2>
                <Trans>Click to create a new collection</Trans>
              </TYPE.body2>
            </RowStart>
          )}
        </RowBetween>
        {myCollections.length > 0 && (
          <Popover show={isOpen} content={popOverContent()} placement="bottom-end" close={close}>
            <ChevronElement showMore={isOpen} />
          </Popover>
        )}
      </RowBetween>
    </VioletCard>
  )
}
