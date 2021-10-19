import { t, Trans } from '@lingui/macro'
import EthereumRound from 'assets/images/ethereum-round.svg'
import PolygonRound from 'assets/images/polygon-round.svg'
import { ButtonGradientBorder } from 'components/Button'
import { RowCenter } from 'components/Row'
import { ETHEREUM_TGE_CHAINS } from 'constants/addresses'
import useSwitchChain from 'hooks/useSwitchChain'
import { useActiveWeb3React } from 'hooks/web3'
import React, { useMemo } from 'react'
import { isMobile } from 'react-device-detect'
import { TYPE } from 'theme'
import { StakingTierCardWrapper } from './style'

export const StakingOtherNetworkCard = () => {
  const switchChain = useSwitchChain()
  const { library, chainId } = useActiveWeb3React()
  const switchToParams = useMemo(() => {
    return chainId && ETHEREUM_TGE_CHAINS.includes(chainId)
      ? { icon: PolygonRound, name: t`polygon` }
      : { icon: EthereumRound, name: t`ethereum` }
  }, [chainId])
  return (
    <StakingTierCardWrapper className="semi-muted">
      <RowCenter style={{ marginTop: '8px' }}>
        <img src={switchToParams.icon} />
      </RowCenter>
      {chainId && (
        <RowCenter marginTop={18}>
          <TYPE.title5 style={{ textTransform: 'uppercase', textAlign: 'center' }}>
            <Trans>wanna stake on {switchToParams.name}?</Trans>
          </TYPE.title5>
        </RowCenter>
      )}
      <RowCenter marginTop={15}>
        <TYPE.body1 fontWeight={400} style={{ width: '10rem', textAlign: 'center' }}>
          <Trans>3 tiers with a total volume of 6,000,000 coins </Trans>
        </TYPE.body1>
      </RowCenter>
      {library?.provider?.isMetaMask && chainId && !isMobile && (
        <RowCenter style={{ marginBottom: '56px', marginTop: 'auto  ' }}>
          <ButtonGradientBorder style={{ width: '100%' }} onClick={() => switchChain.addChain()}>
            Switch network
          </ButtonGradientBorder>
        </RowCenter>
      )}
      {isMobile && (
        <RowCenter style={{ marginBottom: '56px', marginTop: 'auto  ' }}>
          <TYPE.body1 fontWeight={400} style={{ width: '10rem', textAlign: 'center' }}>
            <Trans>Switch to Polygon in your Web3 browser</Trans>
          </TYPE.body1>
        </RowCenter>
      )}
    </StakingTierCardWrapper>
  )
}
