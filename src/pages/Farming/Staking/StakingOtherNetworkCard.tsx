import { RowCenter } from 'components/Row'
import React from 'react'
import { StakingTierCardWrapper } from './style'
import PolygonRound from 'assets/images/polygon-round.svg'
import { TYPE } from 'theme'
import { Trans } from '@lingui/macro'
import useSwitchChain from 'hooks/useSwitchChain'
import { useActiveWeb3React } from 'hooks/web3'
import { isMobile } from 'react-device-detect'
import { ButtonGradientBorder } from 'components/Button'

export const StakingOtherNetworkCard = () => {
  const switchChain = useSwitchChain()
  const { library, chainId } = useActiveWeb3React()

  return (
    <StakingTierCardWrapper className="semi-muted">
      <RowCenter style={{ marginTop: '8px' }}>
        <img src={PolygonRound} />
      </RowCenter>
      <RowCenter marginTop={18}>
        <TYPE.title5 style={{ textTransform: 'uppercase', textAlign: 'center' }}>
          <Trans>Staking on Polygon</Trans>
        </TYPE.title5>
      </RowCenter>
      <RowCenter marginTop={15}>
        <TYPE.body1 fontWeight={400} style={{ width: '10rem', textAlign: 'center' }}>
          <Trans>3 tiers with a total volume of 6,000,000 coins </Trans>
        </TYPE.body1>
      </RowCenter>
      {library?.provider?.isMetaMask && chainId && !isMobile && (
        <RowCenter style={{ marginBottom: '56px', marginTop: 'auto  ' }}>
          <ButtonGradientBorder style={{ width: '100%' }} onClick={() => switchChain.addChain()}>
            Switch
          </ButtonGradientBorder>
        </RowCenter>
      )}
    </StakingTierCardWrapper>
  )
}
