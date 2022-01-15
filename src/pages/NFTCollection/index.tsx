import React, { useEffect } from 'react'
import styled from 'styled-components'

import { useParams } from 'react-router-dom'
import { useNftCollection } from 'state/nft/hooks'

const NftCollectionWrapper = styled.div``
const NftColelctionInfo = styled.div``

interface NFTCollectionPageParams {
  collectionAddress: string
}

const NFTCollection = () => {
  const { collectionAddress } = useParams<NFTCollectionPageParams>()
  const collection = useNftCollection(collectionAddress)

  useEffect(() => {
    collection.fetchTokens()
  }, [collection])

  return (
    <NftCollectionWrapper>
      {!collection.loading && collection.info && (
        <NftColelctionInfo>
          <div>{collection.info.name}</div>
          <div>{collection.info.supply}</div>
        </NftColelctionInfo>
      )}
    </NftCollectionWrapper>
  )
}

export default NFTCollection
