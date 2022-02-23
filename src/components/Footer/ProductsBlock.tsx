import React from 'react'
import { Trans } from '@lingui/macro'
import { NavLink } from 'react-router-dom'

import { routes } from 'utils/routes'
import { ExternalLink } from 'theme'

import { ProductsBlockContainer } from './styleds'

export const ProductsBlock = () => {
  return (
    <ProductsBlockContainer>
      <div>
        <Trans>Our Products</Trans>
      </div>
      <div>
        <NavLink to={routes.swap}>
          <Trans>Swap</Trans>
        </NavLink>
        <NavLink to={routes.staking}>
          <Trans>Farming</Trans>
        </NavLink>
        <NavLink to={routes.securityTokens()}>
          <Trans>Securities</Trans>
        </NavLink>
        <NavLink to="/faucet">
          <Trans>Faucet </Trans>
        </NavLink>
        <NavLink to={routes.pool}>
          <Trans>Pools</Trans>
        </NavLink>
        <ExternalLink href="https://info.ixswap.io/home">
          <Trans>Charts </Trans>
        </ExternalLink>
        <NavLink to={routes.nftCollections}>
          <Trans>NFT</Trans>
        </NavLink>
      </div>
    </ProductsBlockContainer>
  )
}
