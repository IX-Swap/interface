import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'

import { Link, useParams } from 'react-router-dom'
import { useNftCollection } from 'state/nft/hooks'
import NFTPreview from './NFTPreview'
import { TYPE } from 'theme'
import { ButtonPrimary } from 'components/Button'

const NftCollectionWrapper = styled.div`
  width: 100%;
`
const NftCollectionInfo = styled.div`
  padding: 2rem;
`

const NftCollectionItems = styled.div`
  display: grid;

  grid-template-columns: repeat(auto-fit, minmax(auto, 250px));

  gap: 2rem;

  padding: 2rem;

  @media (max-width: 640px) {
    padding: 0;
    gap: 1rem;
  }
`

const NftPreviewLink = styled(Link)`
  width: 350px;
  transition: transform 0.3s;

  text-decoration: none;

  :hover {
    transform: scale(1.05);
  }

  :visited {
    text-decoration: none;
    color: inherit;
  }
`

interface NFTCollectionPageParams {
  collectionAddress: string
}

const NFTCollection = () => {
  const { collectionAddress } = useParams<NFTCollectionPageParams>()
  const collection = useNftCollection(collectionAddress)
  const baseLink = useMemo(() => `/nft/collections/${collectionAddress}/`, [collectionAddress])

  const [fetchedInitial, setFetchedInitial] = useState(false)
  const [tokens, setTokens] = useState<string[]>([])

  useEffect(() => {
    if (!fetchedInitial) {
      collection.fetchTokens().then((uris) => {
        if (uris) {
          setTokens(uris)
          setFetchedInitial(true)
        }
      })
    }
  }, [collection, fetchedInitial])

  return (
    <NftCollectionWrapper>
      {!collection.loading && collection.info && (
        <>
          <NftCollectionInfo>
            <TYPE.titleBig>{collection.info.name}</TYPE.titleBig>
          </NftCollectionInfo>

          <NftCollectionItems>
            {tokens.map((token, idx) => (
              <NftPreviewLink key={`token-uri-${idx}`} to={baseLink + idx}>
                <NFTPreview uri={token} />
              </NftPreviewLink>
            ))}
          </NftCollectionItems>

          {collection.hasMore && <ButtonPrimary onClick={collection.fetchTokens}>More</ButtonPrimary>}
        </>
      )}
    </NftCollectionWrapper>
  )
}

export default NFTCollection
