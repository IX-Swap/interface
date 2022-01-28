import { ButtonGradientBorder } from 'components/Button'
import { LoaderThin } from 'components/Loader/LoaderThin'
import { NFTConnectWallet } from 'components/NFTConnectWallet'
import { RowBetween, RowCenter } from 'components/Row'
import { useActiveWeb3React } from 'hooks/web3'
import { Body, Container } from 'pages/AdminKyc'
import React, { FC, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Flex } from 'rebass'
import { useFetchMyCollections, useNFTState } from 'state/nft/hooks'
import { Edit2 } from 'react-feather'
import { StyledInternalLink, TYPE } from 'theme'
import { routes } from 'utils/routes'
import { ReactComponent as Edit } from '../../assets/images/edit-circle-white.svg'
import LogoWhite from '../../assets/svg/logo-white.svg'
import { CollectionCard, CollectionImage, CollectionImageWrapper, CollectionLogo, CollectionsGrid } from './styleds'
import useTheme from 'hooks/useTheme'
import styled from 'styled-components'
import { NFTCollectionImage } from 'state/nft/types'

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
  const { account } = useActiveWeb3React()
  const fetchMyCollections = useFetchMyCollections()
  const { myCollections, collectionsLoading } = useNFTState()
  const theme = useTheme()
  useEffect(() => {
    fetchMyCollections()
  }, [fetchMyCollections])

  // const handleTabChange = (id: number) => {
  //   setSelectedTabId(id)
  // }

  if (!account) return <NFTConnectWallet />
  return (
    <Container>
      <Body>
        <TYPE.titleBig marginBottom={64} textAlign="center" fontWeight={600}>
          My Collections
        </TYPE.titleBig>
        {/* We don't have categories for collections for now. May be present in the future */}
        {/* <Flex justifyContent="center" alignItems="center">
          {tabs.map(({ id, label }) => (
            <ButtonEmpty
              width="auto"
              padding="0"
              marginRight={2}
              key={`sort-tab-${id}`}
              onClick={() => handleTabChange(id)}
            >
              <Column>
                <SortText active={id === selectedTabId}>
                  <Text marginBottom="10px" fontSize={20}>
                    {label}
                  </Text>
                </SortText>
                {id === selectedTabId && <ActiveSortItemBottom />}
              </Column>
            </ButtonEmpty>
          ))}
        </Flex>
        <Divider marginBottom={40} /> */}
        <RowBetween style={{ marginBottom: '15px', flexWrap: 'wrap' }}>
          <ButtonGradientBorder as={StyledInternalLink} to={routes.nftCollectionImport}>
            Import a collection
          </ButtonGradientBorder>
          <ButtonGradientBorder as={StyledInternalLink} to={routes.nftCollectionCreate}>
            Create a collection
          </ButtonGradientBorder>
        </RowBetween>
        {collectionsLoading && (
          <LoaderWrapper>
            <LoaderThin size={64} />
          </LoaderWrapper>
        )}
        <CollectionsGrid>
          {!collectionsLoading &&
            myCollections.length !== 0 &&
            myCollections.map(({ id, banner, logo, name, address }) => (
              <CollectionCard key={`collection-card-${id}`} as={StyledInternalLink} to={`/nft/collections/${address}`}>
                <CollectionImageWrapper
                  style={{ paddingTop: !banner ? '10px' : '0', objectFit: banner ? 'cover' : 'contain' }}
                >
                  <CollectionImage height="100%" width="100%" src={getImage(banner) ?? LogoWhite} />
                  <CollectionLogo src={getImage(logo) ?? LogoWhite} style={!logo ? { objectFit: 'contain' } : {}} />
                </CollectionImageWrapper>

                <Flex flexDirection="column" alignItems="center" padding="0px 32px 24px 32px">
                  <TYPE.body5 marginBottom="8px" textAlign="center">
                    {name}
                  </TYPE.body5>
                  <Link
                    style={{ marginLeft: 'auto ', padding: '5px' }}
                    to={id !== undefined ? routes.nftEditCollection(id) : routes.nftCollectionCreate}
                  >
                    <Edit2 size={24} color={theme.text1} />
                  </Link>
                </Flex>
              </CollectionCard>
            ))}
        </CollectionsGrid>
        {!collectionsLoading && myCollections.length === 0 && (
          <RowCenter>
            <TYPE.titleBig>You have no collections</TYPE.titleBig>
          </RowCenter>
        )}
      </Body>
    </Container>
  )
}

export default NFTCollections
