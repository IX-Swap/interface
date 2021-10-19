import { t, Trans } from '@lingui/macro'
import EthereumRound from 'assets/images/ethereum-round.svg'
import PolygonRound from 'assets/images/polygon-round.svg'
import { ButtonGradientBorder } from 'components/Button'
import { Line } from 'components/Line'
import { RowCenter } from 'components/Row'
import { ETHEREUM_TGE_CHAINS } from 'constants/addresses'
import useSwitchChain from 'hooks/useSwitchChain'
import { useActiveWeb3React } from 'hooks/web3'
import React, { useMemo } from 'react'
import { isMobile } from 'react-device-detect'
import { TYPE } from 'theme'
import { OptionList, StakingTierCardWrapper } from './style'

export const StakingOtherNetworkCard = () => {
  const switchChain = useSwitchChain()
  const { library, chainId } = useActiveWeb3React()
  const switchToParams = useMemo(() => {
    return chainId && ETHEREUM_TGE_CHAINS.includes(chainId)
      ? {
          icon: PolygonRound,
          name: t`polygon`,
          options: [t`1 month — 18% APY`, t`2 month — 44% APY`, t`3 month — 88% APY`],
        }
      : {
          icon: EthereumRound,
          name: t`ethereum`,
          options: [t`1 month — 18% APY`, t`2 month — 44% APY`, t`3 month — 88% APY`],
        }
  }, [chainId])

  if (switchToParams.options.length === 0) {
    return null
  }
  return (
    <StakingTierCardWrapper className="semi-muted">
      <RowCenter style={{ marginTop: '8px' }}>
        <img src={switchToParams.icon} />
      </RowCenter>
      {chainId && (
        <RowCenter marginTop={18}>
          <TYPE.title5 lineHeight={'27px'} style={{ textTransform: 'uppercase', textAlign: 'center' }}>
            <Trans>wanna stake on {switchToParams.name}?</Trans>
          </TYPE.title5>
        </RowCenter>
      )}
      <RowCenter marginTop={25} marginBottom={18}>
        <Line style={{ width: '84px' }} />
      </RowCenter>
      <RowCenter>
        <TYPE.body1 fontWeight={400} style={{ textAlign: 'center' }}>
          <Trans>Staking options:</Trans>
          <OptionList>
            {switchToParams.options.map((key) => (
              <li key={key}>{key}</li>
            ))}
          </OptionList>
        </TYPE.body1>
      </RowCenter>
      {library?.provider?.isMetaMask && chainId && !isMobile && (
        <RowCenter style={{ marginBottom: '58px', marginTop: 'auto' }}>
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
