import React, { useCallback } from 'react'
import { NavLink } from 'react-router-dom'
import { Flex, Text } from 'rebass'
import styled, { css } from 'styled-components'
import { Trans } from '@lingui/macro'
import { useCookies } from 'react-cookie'
import useScrollPosition from '@react-hook/window-scroll'

import useLightBackground from 'components/AppBackground/useLightBackground'
import { useNativeCurrency } from 'hooks/useNativeCurrencyName'
import { TYPE } from 'theme'
import { useKYCState } from 'state/kyc/hooks'
import { ReactComponent as KYC } from 'assets/images/kyc.svg'
import { ReactComponent as KYCApproved } from 'assets/images/kyc-approved.svg'
import { formatAmount } from 'utils/formatCurrencyAmount'
import { isUserWhitelisted } from 'utils/isUserWhitelisted'
import { AppLogo } from 'components/AppLogo'

import { useActiveWeb3React } from '../../hooks/web3'
import { useETHBalances } from '../../state/wallet/hooks'
import { MobileMenu } from '../Mobile-Menu'
import { RowFixed } from '../Row'
import Web3Status from '../Web3Status'
import { HeaderLinks } from './HeaderLinks'
import { Announcement } from 'components/Announcement'
import { IXSBalance } from './IXSBalance'
import { NetworkCard } from './NetworkCard'
import { useWhitelabelState } from 'state/whitelabel/hooks'
import { routes } from 'utils/routes'

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
  ${({ theme }) =>
    theme.config.background &&
    css`
      background: ${({ theme }) => theme.config.background.secondary};
    `}
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
  flex-direction: column;
  align-items: center;
  border-radius: 12px;
  white-space: nowrap;
  width: fit-content;
  cursor: pointer;
  :focus {
    border: 1px solid blue;
  }
`

const BalanceText = styled(Text)`
  background: ${({ theme }) => theme.bgG2};
  color: ${({ theme }) => theme.text2};
  font-weight: 600;
  font-size: 12px;
  opacity: ${({ theme }) => (theme.config.background ? '1' : '0.5')};
  border-radius: 0 0 40px 40px;
  padding: 0 18px;
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

  ${({ theme }) => theme.mediaWidth.upToExtremelySmall`
    display: none;
  `};
`

const IXSIcon = styled.div``

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
  ${({ theme }) => theme.flexColumnNoWrap}
  width: 100%;
  align-items: space-between;
  position: fixed;
  top: 0;
  z-index: 2;
  ${({ theme }) =>
    theme.config.background &&
    css`
      background: ${({ theme }) => theme.config.background.secondary};
    `}
`

const KYCWrapper = styled.div`
  display: block;

  ${({ theme }) => theme.mediaWidth.upToExtremelySmall`
    display: none;
  `};
`

const KYCCard = styled(Flex)`
  padding: 0px 7px 3px 7px;
  background: ${({ theme }) => theme.bgG13};
  border-radius: 4px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none !important;
  `};
`

export default function Header() {
  const [cookies] = useCookies(['annoucementsSeen'])
  const { account, chainId } = useActiveWeb3React()
  const { hasLightBackground } = useLightBackground()
  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']
  const nativeCurrency = useNativeCurrency()
  const scrollY = useScrollPosition()
  const { kyc } = useKYCState()
  const { config } = useWhitelabelState()

  const isWhitelisted = isUserWhitelisted({ account, chainId })
  
  const isAllowed = useCallback((path: string): boolean => {
    if (!config || config.pages.length === 0) {
      return true
    }

    return config.pages.includes(path)
  }, [config])

  return (
    <>
      <HeaderWrapper>
        {!cookies.annoucementsSeen && <Announcement />}
        <HeaderFrame showBackground={scrollY > 45} lightBackground={hasLightBackground}>
          <HeaderRow>
            <Title href=".">
              <IXSIcon>
                <AppLogo width="auto" height="47px" {...config?.customStyles?.logo} />
              </IXSIcon>
            </Title>
          </HeaderRow>
          <HeaderLinks />
          <HeaderControls>
            {isAllowed(routes.kyc) && isWhitelisted && (
              <KYCWrapper>
                <HeaderElement>
                  <NavLink style={{ textDecoration: 'none', color: 'inherit', marginRight: 16 }} to="/kyc">
                    <KYCCard flexDirection="column" alignItems="center" justifyContent="center">
                      {kyc?.status === 'approved' ? (
                        <KYCApproved style={{ width: 30, height: 30 }} />
                      ) : (
                        <KYC style={{ marginTop: 5 }} />
                      )}
                      <TYPE.smallError color={kyc?.status !== 'approved' ? 'error' : 'green1'}>KYC</TYPE.smallError>
                    </KYCCard>
                  </NavLink>
                </HeaderElement>
              </KYCWrapper>
            )}
            {isAllowed(routes.staking) && isAllowed(routes.vesting) && (
              <HeaderElement>
                <IXSBalance />
              </HeaderElement>
            )}
            <HeaderElement>
              <NetworkCard />
              <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
                <Web3Status />
                {account && userEthBalance ? (
                  <BalanceText style={{ flexShrink: 0 }} fontWeight={600}>
                    <Trans>
                      {formatAmount(+(userEthBalance?.toSignificant(4) || 0))} {nativeCurrency}
                    </Trans>
                  </BalanceText>
                ) : null}
              </AccountElement>
            </HeaderElement>
          </HeaderControls>
          <MobileMenu />
        </HeaderFrame>
      </HeaderWrapper>
    </>
  )
}
