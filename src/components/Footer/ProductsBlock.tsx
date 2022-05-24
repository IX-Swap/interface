import React from 'react'
import { Trans } from '@lingui/macro'
import { NavLink } from 'react-router-dom'

import { routes } from 'utils/routes'
import { ENV_SUPPORTED_TGE_CHAINS } from 'constants/addresses'
import { useActiveWeb3React } from 'hooks/web3'
import { ExternalLink } from 'theme'

import { ProductsBlockContainer } from './styleds'
import { isUserWhitelisted } from 'utils/isUserWhitelisted'
import { isDevelopment } from 'utils/isEnvMode'
import { useKYCState } from 'state/kyc/hooks'
import { KYCStatuses } from 'pages/KYC/enum'

export const ProductsBlock = () => {
  const { chainId, account } = useActiveWeb3React()
  const chains = ENV_SUPPORTED_TGE_CHAINS || [42]
  const isWhitelisted = isUserWhitelisted({ account, chainId })
  const { kyc } = useKYCState()
  const isKycApproved = kyc?.status === KYCStatuses.APPROVED ?? false

  return (
    <ProductsBlockContainer>
      {chainId && account && (
        <div>
          <Trans>Our Products</Trans>
        </div>
      )}
      <div>
        {account && chainId && chains.includes(chainId) && isWhitelisted && (
          <NavLink to={routes.swap}>
            <Trans>Swap</Trans>
          </NavLink>
        )}
        {account && chainId && [...chains, 1].includes(chainId) && (
          <NavLink to={routes.staking}>
            <Trans>Staking</Trans>
          </NavLink>
        )}
        {isKycApproved && account && chainId && chains.includes(chainId) && isWhitelisted && (
          <NavLink to={routes.securityTokens()}>
            <Trans>Securities</Trans>
          </NavLink>
        )}
        {account && chainId && chains.includes(chainId) && isWhitelisted && (
          <NavLink to={routes.pool}>
            <Trans>Pools</Trans>
          </NavLink>
        )}
        {isKycApproved && account && isWhitelisted && (
          <ExternalLink
            target="_self"
            href={isDevelopment ? 'https://dev.info.ixswap.io/' : 'https://info.ixswap.io/home'}
          >
            <Trans>Charts</Trans>
          </ExternalLink>
        )}
        {account && (
          <ExternalLink href="https://docs.google.com/forms/d/e/1FAIpQLSenV66JwRp7MeHMm31EYLw-8VCHWfsyj8ji98l5Cqchpr2IyQ/viewform">
            <Trans>List My Token</Trans>
          </ExternalLink>
        )}
      </div>
    </ProductsBlockContainer>
  )
}
