import React, { useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'

import { MEDIA_WIDTHS } from 'theme'

import { RouteComponentProps, useHistory } from 'react-router-dom'
import { useGetNFTDetails, useNftCollection } from 'state/nft/hooks'
import { NFTImageShow } from 'state/nft/types'
import { NFTConnectWallet } from 'components/NFTConnectWallet'
import { useActiveWeb3React } from 'hooks/web3'

import { routes } from 'utils/routes'

import { NftFilePreview } from '../NFTCollection/NFTPreview'
import LogoWhite from '../../assets/svg/logo-white.svg'
import AppBody from 'pages/AppBody'
import { TGE_CHAINS_WITH_SWAP } from 'constants/addresses'
import { Info } from './Info'
import { Details } from './Details'

interface NftLevel {
  display_type: 'level'
  trait_type: string

  value: number
  max_value: number
}

interface NftProperty {
  display_type: 'rectangle'
  trait_type: string

  value: string
}

interface NftStat {
  display_type: 'stat'
  trait_type: string

  value: number
  max_value: number
}

const ImageContainer = styled.div`
  object-fit: cover;
  width: 100%;
  height: auto;
  border-radius: 12px;
  max-width: 600px;
  margin-left: auto;
  @media (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
    margin: 0 auto;
  }
  * {
    width: 100%;
    height: auto;
    min-width: 100%;
    max-width: 100%;
    max-height: 100%;
  }
`

const NftInfoContainer = styled.div`
  max-width: 544px;
  width: 100%;
  @media (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
    margin: 0 auto;
  }
`

const NftAssetPageWrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 39px;
  @media (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
    grid-template-columns: 1fr;
  }
`

const NftAssetPage = ({
  match: {
    params: { collectionAddress, itemId },
  },
}: RouteComponentProps<{ collectionAddress: string; itemId?: string }>) => {
  const getNFTDetails = useGetNFTDetails(collectionAddress, Number(itemId))
  const [item, setItem] = useState<NFTImageShow | null>(null)
  const [type, setType] = useState('image')
  const collection = useNftCollection(collectionAddress)

  const isNSFW = item?.isNSFW === 'true'
  const isFreeze = item?.freeze === 'true'

  const { account, chainId } = useActiveWeb3React()
  const stats = (item?.attributes?.filter((attr) => attr?.display_type === 'stat') ?? []) as NftStat[]
  const levels = (item?.attributes?.filter((attr) => attr?.display_type === 'level') ?? []) as NftLevel[]
  const rectangles = (item?.attributes?.filter((attr) => attr?.display_type === 'rectangle') ?? []) as NftProperty[]

  const h = useHistory()

  const goToCollection = useCallback(() => {
    if (collectionAddress) {
      h.push(routes.nftViewCollection(collectionAddress))
    }
  }, [collectionAddress, h])

  useEffect(() => {
    async function getDetails() {
      if (collectionAddress && itemId !== undefined) {
        const data = await getNFTDetails()
        await collection.fetchTokens()

        if (!data) return

        const response = await fetch(data.file)
        const itemType = response.headers.get('content-type') ?? 'image'

        setType(itemType)

        if (itemType === 'application/octet-stream') {
          data.file = data.previewUrl
          setType('image')
        }

        setItem(data)
      }
    }
    getDetails()
  }, [getNFTDetails, collectionAddress, itemId])

  if (!account) return <NFTConnectWallet />

  if (!item) {
    return null
  }

  return (
    <AppBody blurred={!chainId || !TGE_CHAINS_WITH_SWAP.includes(chainId)} maxWidth="100%" transparent>
      <NftAssetPageWrapper>
        {item && (
          <ImageContainer>
            <NftFilePreview type={type} path={item.file ?? LogoWhite} />
          </ImageContainer>
        )}

        <NftInfoContainer>
          <Info
            name={item.name}
            description={item.description}
            collectionName={collection?.info?.name || 'Collection'}
            goToCollection={goToCollection}
          />

          <Details stats={stats} levels={levels} rectangles={rectangles} isNSFW={isNSFW} isFreeze={isFreeze} />
        </NftInfoContainer>
      </NftAssetPageWrapper>
    </AppBody>
  )
}

export default NftAssetPage
