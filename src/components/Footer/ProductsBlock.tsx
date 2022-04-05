import React from 'react'
import { Trans } from '@lingui/macro'
import { NavLink } from 'react-router-dom'

import { routes } from 'utils/routes'
import { ENV_SUPPORTED_TGE_CHAINS } from 'constants/addresses'
import { useActiveWeb3React } from 'hooks/web3'
import { ExternalLink } from 'theme'

import { ProductsBlockContainer } from './styleds'

export const ProductsBlock = () => {
  const { chainId, account } = useActiveWeb3React()
  const chains = ENV_SUPPORTED_TGE_CHAINS || [42]
  return (
    <ProductsBlockContainer>
      {chainId && account && (
        <div>
          <Trans>Our Products</Trans>
        </div>
      )}
      <div>
        {account && chainId && chains.includes(chainId) && (
          <NavLink to={routes.swap}>
            <Trans>Swap</Trans>
          </NavLink>
        )}
        {account && chainId && [...chains, 1].includes(chainId) && (
          <NavLink to={routes.staking}>
            <Trans>Staking</Trans>
          </NavLink>
        )}

        {account && chainId && chains.includes(chainId) && (
          <NavLink to={routes.securityTokens()}>
            <Trans>Securities</Trans>
          </NavLink>
        )}
        {/* <NavLink to="/faucet">
          <Trans>Faucet </Trans>
        </NavLink> */}
        {account && chainId && chains.includes(chainId) && (
          <NavLink to={routes.pool}>
            <Trans>Pools</Trans>
          </NavLink>
        )}
        {account && (
          <ExternalLink target="_self" href="https://info.ixswap.io/home">
            <Trans>Charts</Trans>
          </ExternalLink>
        )}
        {/* <NavLink to={routes.nftCollections}>
          <Trans>NFT</Trans>
        </NavLink> */}
      </div>
    </ProductsBlockContainer>
  )
}
