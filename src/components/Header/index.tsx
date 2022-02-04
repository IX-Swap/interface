import { Trans } from '@lingui/macro'
import useScrollPosition from '@react-hook/window-scroll'
import useLightBackground from 'components/AppBackground/useLightBackground'
import { useNativeCurrency } from 'hooks/useNativeCurrencyName'
import React from 'react'
import { Flex, Text } from 'rebass'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import LogoDark from '../../assets/svg/logo-white.svg'
import { useActiveWeb3React } from '../../hooks/web3'
import { useETHBalances } from '../../state/wallet/hooks'
import { MobileMenu } from '../Mobile-Menu'
import { RowFixed } from '../Row'
import Web3Status from '../Web3Status'
import { HeaderLinks } from './HeaderLinks'
import { IXSBalance } from './IXSBalance'
import { NetworkCard } from './NetworkCard'
import { TYPE } from 'theme'

import { ReactComponent as KYC } from '../../assets/images/kyc.svg'

const HeaderFrame = styled.div<{ showBackground: boolean; lightBackground: boolean }>`
  display: grid;
  grid-template-columns: 0.3fr auto 0.3fr;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  top: 0;
  position: relative;
  padding: 1rem;
  z-index: 21;
  position: relative;

  /* Background slide effect on scroll. */
  background-image: ${({ theme, lightBackground }) =>
    `linear-gradient(to bottom, transparent 50%, ${lightBackground ? theme.bg1 : theme.bg0} 50% )}}`};
  background-position: ${({ showBackground }) => (showBackground ? '0 -100%' : '0 0')};
  background-size: 100% 200%;
  /* box-shadow: 0px 0px 0px 1px ${({ theme, showBackground }) => (showBackground ? theme.bg2 : 'transparent;')}; */
  transition: background-position 0.1s, box-shadow 0.1s;
  @media (max-width: 1400px) {
    grid-template-columns: 2fr auto auto;
    grid-gap: 28px;
  }
  @media (max-width: 1080px) {
    grid-template-columns: auto 1fr auto;
    grid-gap: 28px;
    padding: 14px 18px;
  }
  @media (max-width: 500px) {
    grid-gap: 7px;
    grid-template-columns: auto 2fr auto;
  }
`

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: flex-end;

  /* ${({ theme }) => theme.mediaWidth.upToLarge`
    flex-direction: row;
    justify-content: space-between;
    justify-self: center;
    width: 100%;
    max-width: 960px;
    padding: 1rem;
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    z-index: 99;
    height: 72px;
    border-radius: 12px 12px 0 0;
    background-color: ${({ theme }) => theme.bgG1};
  `};
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    padding-top: 3rem;
  `}; */
`

const HeaderElement = styled.div`
  display: flex;
  align-items: center;

  /* addresses safari's lack of support for "gap" */
  & > *:not(:first-child) {
    margin-left: 8px;
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    // flex-direction: row-reverse;
    align-items: center;
  `};
`

const HeaderRow = styled(RowFixed)`
  ${({ theme }) => theme.mediaWidth.upToMedium`
   width: 100%;
  `};
`

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: ${({ theme }) => theme.bgG2};
  border-radius: 12px;
  white-space: nowrap;
  width: fit-content;
  cursor: pointer;
  :focus {
    border: 1px solid blue;
  }
`

const BalanceText = styled(Text)`
  color: ${({ theme }) => theme.text2};
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`

const Title = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;
  justify-self: flex-start;
  margin-right: 12px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    justify-self: center;
  `};
  :hover {
    cursor: pointer;
  }
`

const IXSIcon = styled.div``

const KYCWrapper = styled(Flex)`
  width: 50px;
  height: 45px;
  background: ${({ theme }) => theme.bgG13};
  border-radius: 12px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none !important;
  `};
`

export const StyledMenuButton = styled.button`
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: 35px;
  background-color: ${({ theme }) => theme.bg2};
  margin-left: 8px;
  padding: 0.15rem 0.5rem;
  border-radius: 0.5rem;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    background-color: ${({ theme }) => theme.bg4};
  }

  svg {
    margin-top: 2px;
  }
  > * {
    stroke: ${({ theme }) => theme.text1};
  }
`

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: 2;
`
export default function Header() {
  const { account } = useActiveWeb3React()
  const { hasLightBackground } = useLightBackground()
  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']
  const nativeCurrency = useNativeCurrency()
  const scrollY = useScrollPosition()
  return (
    <>
      <HeaderWrapper>
        <HeaderFrame showBackground={scrollY > 45} lightBackground={hasLightBackground}>
          <HeaderRow>
            <Title href=".">
              <IXSIcon>
                <img width={'38px'} height={'47px'} src={LogoDark} alt="logo" />
              </IXSIcon>
            </Title>
          </HeaderRow>
          <HeaderLinks />
          <HeaderControls>
            <NavLink style={{ textDecoration: 'none', color: 'inherit' }} to="/kyc">
              <KYCWrapper flexDirection="column" marginRight="16px" alignItems="center" justifyContent="center">
                <KYC />
                <TYPE.smallError>KYC</TYPE.smallError>
              </KYCWrapper>
            </NavLink>
            {/* <HeaderElement>
              <IXSBalance />
            </HeaderElement> */}
            <HeaderElement>
              {/* <NetworkCard /> */}
              <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
                {account && userEthBalance ? (
                  <BalanceText style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={600}>
                    <Trans>
                      {userEthBalance?.toSignificant(4)} {nativeCurrency}
                    </Trans>
                  </BalanceText>
                ) : null}
                <Web3Status />
              </AccountElement>
            </HeaderElement>
          </HeaderControls>
          <MobileMenu />
        </HeaderFrame>
      </HeaderWrapper>
    </>
  )
}
