import React, { useEffect, useState } from 'react'
import { Trans } from '@lingui/macro'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { StyledPageHeader, TYPE } from 'theme'

import { RowFixed } from 'components/Row'
import Column, { AutoColumn } from 'components/Column'
import { NFTConnectWallet } from 'components/NFTConnectWallet'

import { SUPPORTED_TGE_CHAINS } from 'constants/addresses'

import { useActiveWeb3React } from 'hooks/web3'

import AppBody from 'pages/AppBody'

import { Input } from 'components/Input'
import { ButtonPrimary } from 'components/Button'
import { CHAIN_INFO } from 'constants/chains'
import { useNftCollectionImport } from 'state/nft/hooks'

const NftLinkInput = styled(Input)`
  padding: 0.4rem;
  border-radius: 1rem;
`

const nftIdRegExp = RegExp(/^0x[a-zA-Z0-9]{40}$/)

const extractNft = (address: string) => {
  if (address.startsWith('https://opensea.io/assets/')) {
    return extractNftFromOpenSea(address)
  }

  if (address.startsWith('https://rarible.com/token/')) {
    return extractNftFromRarible(address)
  }

  throw new Error('Invalid import URL. Enter correct Rarible or OpenSea link')
}

const extractNftFromOpenSea = (address: string) => {
  return address.replace('https://opensea.io/assets/', '').split('/').shift()
}

const extractNftFromRarible = (address: string) => {
  return address.replace('https://rarible.com/token/', '').split(':').shift()
}

export default function Faucet() {
  const { account, chainId } = useActiveWeb3React()

  const [nftLink, setNftLink] = useState('')
  const [nftId, setNftId] = useState('')

  const [error, setError] = useState<string | null>(null)

  const history = useHistory()
  const importNft = useNftCollectionImport(history)

  useEffect(() => {
    try {
      const id = extractNft(nftLink)

      if (id) {
        setNftId(id)
      }
    } catch (err) {
      // Avoid showing error when the link is empty
      if (nftLink.length > 0) {
        setError((err as Error).message)
      } else {
        setNftId('')
      }
    }
  }, [nftLink, setNftId])

  useEffect(() => {
    if (nftId.length > 0 && !nftIdRegExp.test(nftId)) {
      setError('Invalid ERC721 contract')
    } else {
      setError(null)
    }
  }, [nftId, setError])

  const chain = (chainId && CHAIN_INFO[chainId]) || null
  //const blurred = chainId !== undefined && !TGE_CHAINS_WITH_SWAP.includes(chainId)
  const showExtraInput = chainId === SUPPORTED_TGE_CHAINS.MAIN || SUPPORTED_TGE_CHAINS.MATIC
  const blurred = chainId !== SUPPORTED_TGE_CHAINS.KOVAN

  if (!account) return <NFTConnectWallet />

  return (
    <AppBody blurred={blurred}>
      <AutoColumn gap="1rem">
        <StyledPageHeader>
          <RowFixed>
            <TYPE.black fontWeight={600} fontSize={22} style={{ marginRight: '8px' }}>
              <Trans>Import your collections</Trans>
            </TYPE.black>
          </RowFixed>
        </StyledPageHeader>

        <TYPE.body3>
          <Trans>What is the address of your ERC721 contract on {chain?.chainName}?</Trans>
        </TYPE.body3>

        <NftLinkInput
          value={nftId}
          placeholder="Enter your ERC721 contract address"
          onChange={(e) => setNftId(e.target.value)}
        />

        {showExtraInput && (
          <Column style={{ marginTop: '22px', gap: '11px' }}>
            <TYPE.subHeader textAlign="center">
              <Trans>Or</Trans>
            </TYPE.subHeader>
            <TYPE.body3>
              <Trans>Or enter an opensea or rarible link to one of the collection&apos;s assets</Trans>
            </TYPE.body3>
            <NftLinkInput
              value={nftLink}
              placeholder="https://opensea.io/assets/0x495f947276749ce646f68ac8c248420045cb7b5e/93544478796600828149244254075023360567625733299218796914312466979142108184577"
              onChange={(e) => setNftLink(e.target.value)}
            />
          </Column>
        )}

        {error && <TYPE.error error>{error}</TYPE.error>}

        <ButtonPrimary disabled={error !== null} onClick={() => importNft({ address: nftId })}>
          Submit
        </ButtonPrimary>
      </AutoColumn>
    </AppBody>
  )
}
