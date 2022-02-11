import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'

import { Link, useHistory, useParams } from 'react-router-dom'
import { useNftCollection } from 'state/nft/hooks'
import NFTPreview from './NFTPreview'
import { TYPE, StyledInternalLink } from 'theme'
import { ButtonGradientBorder, ButtonIXSGradient, ButtonPrimary } from 'components/Button'
import { RowBetween } from 'components/Row'
import { routes } from 'utils/routes'
import AppBody from 'pages/AppBody'
import { useWeb3React } from '@web3-react/core'
import { TGE_CHAINS_WITH_SWAP } from 'constants/addresses'

const NftCollectionWrapper = styled.div`
  position: relative;
  width: 100%;
`
const NftCollectionBackButtonWrapper = styled.div`
  position: absolute;

  left: 0;
  top: 2rem;

  margin: 0 2rem;
`
/*
@media (max-width: 725px) {
    position: relative;
    gap: 1rem;
    margin: 0.25rem 0;
  }
*/

const NftCreateButtonWrapper = styled.div`
  position: absolute;

  right: 0;
  top: 2rem;

  margin: 0 0 2rem 2rem;
`

/*
@media (max-width: 725px) {
    position: relative;
    gap: 1rem;
    margin: 0 0 2rem 0;
    top: 0;
  }
*/

const NftCollectionInfo = styled.div`
  padding: 1rem;

  width: 100%;

  display: flex;
  flex-flow: row;

  justify-content: center;
  align-items: center;

  text-align: center;

  @media (max-width: 730px) {
    margin-top: 5rem;
  }
`

const NftCollectionItems = styled.div`
  display: grid;

  grid-template-columns: repeat(auto-fit, 350px);
  grid-auto-rows: 450px;

  place-content: center;

  gap: 2rem;

  padding: 2rem;

  @media (max-width: 770px) {
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

const NoNftContainer = styled.div`
  text-align: center;

  padding: 2.5rem;

  width: 100%;
`

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

  return (
    <AppBody blurred={!chainId || !TGE_CHAINS_WITH_SWAP.includes(chainId)} maxWidth="100%" transparent>
      <NftCollectionWrapper>
        {!collection.loading && collection.info && (
          <>
            <RowBetween style={{ marginBottom: '15px', flexWrap: 'wrap' }}>
              <NftCollectionBackButtonWrapper>
                <ButtonGradientBorder onClick={() => history.push(routes.nftCollections)}>
                  <TYPE.title3>Back</TYPE.title3>
                </ButtonGradientBorder>
              </NftCollectionBackButtonWrapper>

              <NftCreateButtonWrapper>
                <ButtonGradientBorder onClick={() => history.push(routes.nftCreate)}>
                  <TYPE.title3>Create NFT</TYPE.title3>
                </ButtonGradientBorder>
              </NftCreateButtonWrapper>
            </RowBetween>

            <NftCollectionInfo>
              <TYPE.titleBig>{collection.info.name}</TYPE.titleBig>
            </NftCollectionInfo>

            {collection.info.supply === 0 && (
              <NoNftContainer>
                <TYPE.title8>No any NFTs</TYPE.title8>
              </NoNftContainer>
            )}

            <NftCollectionItems>
              {tokens.length > 0 &&
                tokens.map((token, idx) => (
                  <NftPreviewLink key={`token-uri-${idx}`} to={baseLink + idx}>
                    <NFTPreview uri={token} />
                  </NftPreviewLink>
                ))}
            </NftCollectionItems>

            {collection.hasMore && <ButtonPrimary onClick={collection.fetchTokens}>More</ButtonPrimary>}
          </>
        )}
      </NftCollectionWrapper>
    </AppBody>
  )
}

export default NFTCollection
