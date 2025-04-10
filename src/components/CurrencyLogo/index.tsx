import { Currency } from '@ixswap1/sdk-core'
import { SupportedChainId } from 'constants/chains'
import { useSimpleTokens } from 'hooks/Tokens'
import { useNativeCurrency } from 'hooks/useNativeCurrency'
import { useActiveWeb3React } from 'hooks/web3'
import React, { useMemo } from 'react'
import styled from 'styled-components/macro'
import EthereumLogo from '../../assets/images/ethereum-logo.png'
import PoligonLogo from '../../assets/images/polygon.svg'
import RedBellyLogo from '../../assets/images/chains/redbelly.png'
import useHttpLocations from '../../hooks/useHttpLocations'
import { WrappedTokenInfo } from '../../state/lists/wrappedTokenInfo'
import Logo from '../Logo'
import { getPublicAssetUrl } from 'components/TokenLogo/utils'

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

export const getOriginalNetworkFromToken = (tokenInfo: any) => {
  return tokenInfo?.originalNetwork?.charAt(0)?.toUpperCase() + tokenInfo?.originalNetwork?.slice(1) || ''
}

export const getNetworkFromToken = (tokenInfo: any) => {
  return tokenInfo?.network?.charAt(0)?.toUpperCase() + tokenInfo?.network?.slice(1) || ''
}

const StyledEthereumLogo = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  min-width: ${({ size }) => size};
  min-height: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  border-radius: 24px;
`

const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  min-width: ${({ size }) => size};
  min-height: ${({ size }) => size};
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
  currency?: Currency | null
  size?: string
  style?: React.CSSProperties
}) {
  const native = useNativeCurrency()
  const tokens = useSimpleTokens()

  const uri =
    currency instanceof WrappedTokenInfo
      ? currency?.logoURI ||
        (tokens[currency?.address] as any)?.tokenInfo?.logoURI ||
        getPublicAssetUrl((currency?.tokenInfo as any)?.logo)
      : undefined
  const uriLocations = useHttpLocations(uri)
  const { chainId } = useActiveWeb3React()
  const srcs: string[] = useMemo(() => {
    if (!currency || currency?.isNative) return []

    if (currency?.isToken) {
      const defaultUrls = currency?.chainId === 1 ? [getTokenLogoURL(currency?.address, chainId)] : []
      if (currency instanceof WrappedTokenInfo) {
        return [...uriLocations, ...defaultUrls]
      }
      return defaultUrls
    }
    return []
  }, [currency, uriLocations, chainId])

  if (currency?.isNative) {
    if (native.symbol === 'RBNT') {
      return <StyledEthereumLogo src={RedBellyLogo} size={size} style={style} {...rest} />
    }
    if (native.symbol === 'MATIC') {
      return <StyledEthereumLogo src={PoligonLogo} size={size} style={style} {...rest} />
    }
    return <StyledEthereumLogo src={EthereumLogo} size={size} style={style} {...rest} />
  }
  return <StyledLogo size={size} srcs={srcs} alt={`${currency?.symbol ?? 'token'} logo`} style={style} {...rest} />
}
