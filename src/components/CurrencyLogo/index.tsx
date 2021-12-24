import { Currency } from '@ixswap1/sdk-core'
import { SupportedChainId } from 'constants/chains'
import { useActiveWeb3React } from 'hooks/web3'
import React, { useMemo } from 'react'
import styled from 'styled-components/macro'
import EthereumLogo from '../../assets/images/ethereum-logo.png'
import useHttpLocations from '../../hooks/useHttpLocations'
import { WrappedTokenInfo } from '../../state/lists/wrappedTokenInfo'
import Logo from '../Logo'

type Network = 'ethereum' | 'polygon'

export function chainIdToNetworkName(networkId: SupportedChainId): Network {
  switch (networkId) {
    case SupportedChainId.MAINNET:
      return 'ethereum'
    case SupportedChainId.MATIC:
      return 'polygon'
    case SupportedChainId.MUMBAI:
      return 'polygon'
    default:
      return 'ethereum'
  }
}
export const getTokenLogoURL = (address: string, chainId = SupportedChainId.MAINNET) => {
  const network = chainIdToNetworkName(chainId)
  return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${network}/assets/${address}/logo.png`
}

export const getNetworkFromToken = (tokenInfo: any) => {
  return tokenInfo?.originalNetwork?.charAt(0)?.toUpperCase() + tokenInfo?.originalNetwork?.slice(1) || ''
}

const StyledEthereumLogo = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  border-radius: 24px;
`

const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  background-color: ${({ theme }) => theme.white};
`

export default function CurrencyLogo({
  currency,
  size = '24px',
  style,
  ...rest
}: {
  currency?: Currency
  size?: string
  style?: React.CSSProperties
}) {
  const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined)
  const { chainId } = useActiveWeb3React()
  const srcs: string[] = useMemo(() => {
    if (!currency || currency.isNative) return []

    if (currency.isToken) {
      const defaultUrls = currency.chainId === 1 ? [getTokenLogoURL(currency.address, chainId)] : []
      if (currency instanceof WrappedTokenInfo) {
        return [...uriLocations, ...defaultUrls]
      }
      return defaultUrls
    }
    return []
  }, [currency, uriLocations, chainId])

  if (currency?.isNative) {
    return <StyledEthereumLogo src={EthereumLogo} size={size} style={style} {...rest} />
  }
  console.log({ srcs })
  return <StyledLogo size={size} srcs={srcs} alt={`${currency?.symbol ?? 'token'} logo`} style={style} {...rest} />
}
