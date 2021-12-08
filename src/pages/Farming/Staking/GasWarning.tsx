import { Trans } from '@lingui/macro'
import { WarningCard } from 'components/WarningCard'
import { MAIN_TGE_CHAINS } from 'constants/addresses'
import { CHAIN_INFO, SupportedChainId } from 'constants/chains'
import { useActiveWeb3React } from 'hooks/web3'
import React, { useMemo } from 'react'
import { ExternalLink } from 'theme'

export const GasWarning = () => {
  const { chainId } = useActiveWeb3React()
  const explorerLink = CHAIN_INFO[chainId as SupportedChainId].blockExplorerUrls[0]
  const gasLink = `${explorerLink ?? 'https://etherscan.io/'}gastracker`
  const message = useMemo(() => {
    return (
      <>
        <Trans>
          Gas fees may be very high for staking. Note that in order to submit staking, two transactions must be signed.
          The second transaction might be significantly more expensive than the first one. Please
          <ExternalLink href={gasLink} style={{ marginLeft: '3px', textDecoration: 'underline' }}>
            check Gas fees
          </ExternalLink>
          .
        </Trans>
      </>
    )
  }, [gasLink])
  if (!MAIN_TGE_CHAINS.includes(chainId as SupportedChainId)) {
    return null
  }
  return <WarningCard message={message} style={{ padding: '20px' }} />
}
