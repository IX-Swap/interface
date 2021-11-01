import { t, Trans } from '@lingui/macro'
import EthereumRound from 'assets/images/ethereum-round.svg'
import PolygonRound from 'assets/images/polygon-round.svg'
import { ButtonGradientBorder } from 'components/Button'
import { Line } from 'components/Line'
import { RowCenter } from 'components/Row'
import { SupportedChainId } from 'constants/chains'
import useSwitchChain from 'hooks/useSwitchChain'
import { useActiveWeb3React } from 'hooks/web3'
import React, { useMemo } from 'react'
import { isMobile } from 'react-device-detect'
import { DesktopAndTablet, TYPE } from 'theme'
import { OptionList, StakingTierCardWrapper, SwitchNetworkWrap } from './style'

export const StakingOtherNetworkCard = () => {
  const switchChain = useSwitchChain()
  const { library, chainId } = useActiveWeb3React()

  const switchToParams = useMemo(
    () => ({
      [SupportedChainId.MAINNET]: {
        icon: PolygonRound,
        name: t`polygon`,
        options: [t`1 month — 18% APY`, t`2 month — 44% APY`, t`3 month — 88% APY`],
        switchTitle: t`other pools on polygon`,
      },
      [SupportedChainId.KOVAN]: {
        icon: PolygonRound,
        name: t`polygon`,
        options: [t`1 month — 18% APY`, t`2 month — 44% APY`, t`3 month — 88% APY`],
        switchTitle: t`other pools on polygon`,
      },
      [SupportedChainId.MATIC]: {
        icon: EthereumRound,
        name: t`ethereum`,
        options: [t`2 month — 44% APY`, t`3 month — 88% APY`],
        switchTitle: t`other pools on ethereum`,
      },
      [SupportedChainId.MUMBAI]: {
        icon: EthereumRound,
        name: t`ethereum`,
        options: [],
        switchTitle: t`other pools on ethereum`,
      },
    }),
    []
  )

  const computedSwitchToParams = useMemo(() => {
    if (chainId) {
      return switchToParams[chainId as SupportedChainId]
    }
    return null
  }, [chainId, switchToParams])

  if (computedSwitchToParams?.options?.length === 0) {
    return null
  }
  return (
    <StakingTierCardWrapper className="semi-muted">
      <RowCenter style={{ marginTop: '8px' }}>
        <img src={computedSwitchToParams?.icon} />
      </RowCenter>
      {chainId && (
        <RowCenter marginTop={18}>
          <TYPE.title5 lineHeight={'27px'} style={{ textTransform: 'uppercase', textAlign: 'center' }}>
            <Trans>{computedSwitchToParams?.switchTitle}</Trans>
          </TYPE.title5>
        </RowCenter>
      )}
      <DesktopAndTablet>
        <RowCenter marginTop={25} marginBottom={18}>
          <Line style={{ width: '84px' }} />
        </RowCenter>
      </DesktopAndTablet>
      <RowCenter>
        <TYPE.body1 fontWeight={400} style={{ textAlign: 'center' }}>
          <Trans>Staking options:</Trans>
          <OptionList>
            {computedSwitchToParams?.options?.map((key) => (
              <li key={key}>{key}</li>
            ))}
          </OptionList>
        </TYPE.body1>
      </RowCenter>
      {library?.provider?.isMetaMask && chainId && (
        <RowCenter style={{ marginBottom: '50px', marginTop: 'auto' }}>
          <ButtonGradientBorder style={{ width: '100%' }} onClick={() => switchChain.addChain()}>
            Switch network
          </ButtonGradientBorder>
        </RowCenter>
      )}
      {isMobile && (
        <SwitchNetworkWrap>
          <TYPE.body1 fontWeight={400} style={{ width: '10rem', textAlign: 'center' }}>
            <Trans>Switch to Polygon in your Web3 browser</Trans>
          </TYPE.body1>
        </SwitchNetworkWrap>
      )}
    </StakingTierCardWrapper>
  )
}
