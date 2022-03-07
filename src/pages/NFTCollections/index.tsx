import React, { FC, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Flex } from 'rebass'

import { ButtonGradientBorder, ButtonIXSGradient } from 'components/Button'
import { LoaderThin } from 'components/Loader/LoaderThin'
import { NFTConnectWallet } from 'components/NFTConnectWallet'
import { useActiveWeb3React } from 'hooks/web3'
import { Body, Container } from 'pages/AdminKyc'
import { useFetchMyCollections, useNFTState } from 'state/nft/hooks'
import { Edit2 } from 'react-feather'
import { StyledInternalLink, TYPE } from 'theme'
import { routes } from 'utils/routes'
import useTheme from 'hooks/useTheme'
import styled from 'styled-components'
import { NFTCollectionImage } from 'state/nft/types'
import { useUserisLoggedIn } from 'state/auth/hooks'
import AppBody from 'pages/AppBody'
import { TGE_CHAINS_WITH_SWAP } from 'constants/addresses'

import LogoWhite from '../../assets/svg/logo-white.svg'
import { ReactComponent as MenuIcon } from '../../assets/images/menu.svg'
import {
  CollectionCard,
  CollectionImage,
  CollectionImageWrapper,
  CollectionLogo,
  CollectionsGrid,
  ButtonsContainer,
  TextInfo,
  MoreActions,
} from './styleds'
import { NoCollections } from './NoCollections'
import { ImageLoader } from 'components/ImageLoader'

const LoaderWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;

  justify-content: center;
  align-items: center;

  width: 100%;
  padding: 2rem;
`

const getImage = (item: NFTCollectionImage | string | undefined): string | null => {
  if (!item) {
    return null
  }

  if (typeof item === 'string') {
    return item
  }

  return item.public
}

const NFTCollections: FC = () => {
  // const [selectedTabId, setSelectedTabId] = useState(1)
  const { account, chainId } = useActiveWeb3React()
  const isLoggedIn = useUserisLoggedIn()
  const fetchMyCollections = useFetchMyCollections()
  const { myCollections, collectionsLoading } = useNFTState()
  const theme = useTheme()

  //const blurred = chainId !== SUPPORTED_TGE_CHAINS.KOVAN

  const onSetCollectionState = useCallback(() => {
    if (!account || !chainId) {
      return
    }

    fetchMyCollections(chainId)
  }, [account, chainId, fetchMyCollections])

  useEffect(() => {
    if (!isLoggedIn || !chainId) {
      return
    }

    onSetCollectionState()
  }, [isLoggedIn, chainId])

  if (!account) return <NFTConnectWallet />
  return (
    <AppBody blurred={!chainId || !TGE_CHAINS_WITH_SWAP.includes(chainId)} maxWidth="100%" transparent>
      <Container style={{ width: '100%' }}>
        <Body style={{ padding: '0 10px' }}>
          <TYPE.titleBig marginBottom={32} textAlign="center" fontWeight={600}>
            My Collections
          </TYPE.titleBig>
          {!collectionsLoading && myCollections.length !== 0 && (
            <ButtonsContainer>
              <ButtonGradientBorder as={StyledInternalLink} to={routes.nftCollectionImport}>
                Import a collection
              </ButtonGradientBorder>
              <ButtonIXSGradient as={StyledInternalLink} to={routes.nftCollectionCreate}>
                Create a collection
              </ButtonIXSGradient>
            </ButtonsContainer>
          )}
          {collectionsLoading && (
            <LoaderWrapper>
              <LoaderThin size={64} />
            </LoaderWrapper>
          )}
          {!collectionsLoading && myCollections.length !== 0 && (
            <CollectionsGrid>
              {myCollections.map(({ id, cover, logo, name, address, description }) => (
                <CollectionCard
                  key={`collection-card-${id}`}
                  as={StyledInternalLink}
                  to={`/nft/collections/${address}`}
                >
                  <MoreActions
                    className="more-actions"
                    as={StyledInternalLink}
                    to={id !== undefined ? routes.nftEditCollection(id) : routes.nftCollectionCreate}
                  >
                    <MenuIcon />
                  </MoreActions>
                  <CollectionImageWrapper style={{ paddingTop: !cover ? '10px' : '0' }}>
                    <CollectionImage
                      height="100%"
                      width="100%"
                      src={getImage(cover) ?? LogoWhite}
                      style={{ objectFit: cover ? 'cover' : 'contain' }}
                    />

                    <CollectionLogo src={getImage(logo) ?? LogoWhite} style={!logo ? { objectFit: 'contain' } : {}} />
                  </CollectionImageWrapper>
                  <TextInfo>
                    <div>{name}</div>
                    {description && <div>{description}</div>}
                  </TextInfo>
                </CollectionCard>
              ))}
            </CollectionsGrid>
          )}
          {!collectionsLoading && myCollections.length === 0 && <NoCollections />}
        </Body>
      </Container>
    </AppBody>
  )
}

export default NFTCollections
