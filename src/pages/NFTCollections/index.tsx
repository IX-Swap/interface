import React, { FC, useEffect, useState } from 'react'
import { Flex, Text } from 'rebass'
import { Link } from 'react-router-dom'

import {
  CollectionsGrid,
  CollectionCard,
  CollectionImage,
  CollectionLogo,
  CollectionImageWrapper,
  SortText,
  ActiveSortItemBottom,
  Divider,
} from './styleds'
import { collections } from 'pages/CreateNFT/mocks'
import { Container, Body } from 'pages/AdminKyc'
import { StyledInternalLink, TYPE } from 'theme'
import Column from 'components/Column'

import { tabs } from './mocks'
import LogoWhite from '../../assets/svg/logo-white.svg'
import { ReactComponent as Edit } from '../../assets/images/edit-circle-white.svg'
import { ButtonEmpty } from 'components/Button'
import { useActiveWeb3React } from 'hooks/web3'
import { NFTConnectWallet } from 'components/NFTConnectWallet'
import { useFetchMyCollections, useNFTState } from 'state/nft/hooks'
import { LoaderThin } from 'components/Loader/LoaderThin'
import { Type } from 'react-feather'
import { NFTCollection } from 'state/nft/types'
import { RowCenter } from 'components/Row'

const NFTCollections: FC = () => {
  // const [selectedTabId, setSelectedTabId] = useState(1)
  const { account } = useActiveWeb3React()
  const fetchMyCollections = useFetchMyCollections()
  const { myCollections, collectionsLoading } = useNFTState()

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
          Explore Collections
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
        {collectionsLoading && <LoaderThin size={64} />}
        <CollectionsGrid>
          {!collectionsLoading &&
            myCollections.length !== 0 &&
            myCollections.map(({ id, banner, logo, name, address }) => (
              <CollectionCard key={`collection-card-${id}`} as={StyledInternalLink} to={`/nft/collections/${address}`}>
                <CollectionImageWrapper>
                  <CollectionImage height="100%" width="100%" src={banner || LogoWhite} />
                  <CollectionLogo src={logo || LogoWhite} style={!logo ? { objectFit: 'contain' } : {}} />
                </CollectionImageWrapper>

                <Flex flexDirection="column" alignItems="center" padding="0px 32px 24px 32px">
                  <TYPE.body5 marginBottom="8px" textAlign="center">
                    {name}
                  </TYPE.body5>
                  <Link style={{ marginLeft: 'auto ' }} to={`/nft/${id}/edit`}>
                    <Edit />
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
