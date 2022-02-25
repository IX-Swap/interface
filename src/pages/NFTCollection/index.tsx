import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'

import { Link, useHistory, useParams } from 'react-router-dom'
import { useNftCollection } from 'state/nft/hooks'
import NFTPreview from './NFTPreview'
import { TYPE } from 'theme'
import { ButtonGradientBorder, ButtonIXSGradient, ButtonPrimary } from 'components/Button'
import { RowBetween } from 'components/Row'
import { routes } from 'utils/routes'
import AppBody from 'pages/AppBody'
import { useWeb3React } from '@web3-react/core'
import { TGE_CHAINS_WITH_SWAP } from 'constants/addresses'

import {
  NftCollectionWrapper,
  ActionButtons,
  NftCollectionInfo,
  NftCollectionItems,
  NftPreviewLink,
  NoNftContainer,
  CoverImage,
  ImagesContainer,
  CollectionLogo,
  Title,
  Description,
} from './styled'
import { NoNFTs } from './NoNFTs'

interface NFTCollectionPageParams {
  collectionAddress: string
}

const NFTCollection = () => {
  const { collectionAddress } = useParams<NFTCollectionPageParams>()
  const { chainId } = useWeb3React()
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

  const history = useHistory()
  console.log('log => collection', collection)
  return (
    <AppBody blurred={!chainId || !TGE_CHAINS_WITH_SWAP.includes(chainId)} maxWidth="100%" transparent>
      <NftCollectionWrapper>
        {!collection.loading && collection.info && (
          <>
            <ImagesContainer>
              {collection.info.cover && <CoverImage src={collection.info.cover.public} />}
              {collection.info.logo && (
                <CollectionLogo>
                  <img src={collection.info.logo.public} />
                </CollectionLogo>
              )}
            </ImagesContainer>

            <NftCollectionInfo>
              <Title>{collection.info.name}</Title>
              {collection.info.description && <Description>{collection.info.description}</Description>}
            </NftCollectionInfo>
            <ActionButtons>
              <ButtonGradientBorder onClick={() => history.push(routes.nftCollections)}>Back</ButtonGradientBorder>
              <ButtonIXSGradient onClick={() => history.push(routes.nftCreate)}>Create NFT</ButtonIXSGradient>
            </ActionButtons>
            {collection.info.supply === 0 && <NoNFTs />}

            {tokens.length > 0 && (
              <NftCollectionItems>
                {tokens.map((token, idx) => (
                  <NftPreviewLink key={`token-uri-${idx}`} to={baseLink + idx}>
                    <NFTPreview uri={token} />
                  </NftPreviewLink>
                ))}
              </NftCollectionItems>
            )}

            {collection.hasMore && <ButtonPrimary onClick={collection.fetchTokens}>More</ButtonPrimary>}
          </>
        )}
      </NftCollectionWrapper>
    </AppBody>
  )
}

export default NFTCollection
