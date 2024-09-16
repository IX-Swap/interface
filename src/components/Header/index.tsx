import React, { useCallback, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Text } from 'rebass'
import styled, { css } from 'styled-components'
import { Trans } from '@lingui/macro'
import { useCookies } from 'react-cookie'
import _get from 'lodash/get'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useKYCState } from 'state/kyc/hooks'
import { routes } from 'utils/routes'
import { ReactComponent as NewKYCLogo } from 'assets/images/newKYCLogo.svg'
import { isUserWhitelisted } from 'utils/isUserWhitelisted'
import { useActiveWeb3React } from '../../hooks/web3'
import { MobileMenu } from '../Mobile-Menu'
import { RowFixed } from '../Row'
import Web3Status from '../Web3Status'
import { HeaderLinks } from './HeaderLinks'
import { Announcement } from 'components/Announcement'
import { IXSBalance } from './IXSBalance'
import { NetworkCard } from './NetworkCard'
import { useWhitelabelState } from 'state/whitelabel/hooks'
import { useRole } from 'state/user/hooks'
import { ReactComponent as NewLogo } from 'assets/images/ix-swapNew.svg'
import { isMobile } from 'react-device-detect'
import BuyModal from 'components/LaunchpadOffer/InvestDialog/BuyModal'
import { PinnedContentButton } from 'components/Button'
import AdministrationMenu from './AdministrationMenu'

export default function Header() {
  const [cookies] = useCookies(['annoucementsSeen'])
  const { account, chainId } = useActiveWeb3React()
  const { kyc } = useKYCState()
  const { config } = useWhitelabelState()
  const { isUser } = useRole()
  const isWhitelisted = isUserWhitelisted({ account, chainId })
  const { openConnectModal } = useConnectModal()

  const [openPreviewModal, setPreviewModal] = useState(false)

  const logoUrl = _get(config, 'logoUrl', null)

  const isAllowed = useCallback(
    (path: string) => {
      if (!config || !config.pages || config.pages.length === 0) {
        return true
      }

      return config.pages.includes(path)
    },
    [config]
  )

  const closeModal = () => {
    setPreviewModal(false)
  }

  return (
    <>
      {isMobile && (
        <HeaderWrapper>
          {!cookies.annoucementsSeen && <Announcement />}
          <HeaderFrame>
            <HeaderRow>
              <Title to={routes.defaultRoute}>
                {logoUrl ? (
                  <img src={logoUrl} alt="logo" width="auto" height="47px" />
                ) : (
                  <IXSIcon>
                    <NewLogo width="130px" height="47px" />
                  </IXSIcon>
                )}
              </Title>
            </HeaderRow>
            <HeaderControls>
              {isAllowed(routes.kyc) && isWhitelisted && (
                <HeaderElement>
                  <NavLink style={{ textDecoration: 'none', color: 'inherit', marginTop: 5 }} to={routes.defaultRoute}>
                    {kyc?.status !== 'approved' ? <NewKYCLogo /> : <NewKYCLogo />}
                  </NavLink>
                </HeaderElement>
              )}
            </HeaderControls>
            <MobileMenu />
            {kyc?.status === 'approved' && (
              <HeaderRowNew>
                <HeaderElement>
                  <NetworkCard />
                </HeaderElement>
                <HeaderElement>
                  <Web3Status />
                </HeaderElement>
              </HeaderRowNew>
            )}
          </HeaderFrame>
          {kyc?.status !== 'approved' && (
            <HeaderElement style={{ background: 'white', padding: '18px 20px' }}>
              <Web3Status />
            </HeaderElement>
          )}
        </HeaderWrapper>
      )}
      {!isMobile && (
        <HeaderWrapper>
          {!cookies.annoucementsSeen && <Announcement />}
          <HeaderFrame>
            <HeaderRow marginLeft={50}>
              <Title to={routes.defaultRoute}>
                {logoUrl ? (
                  <div style={{ width: 130 }}>
                    <img src={logoUrl} alt="logo" style={{ width: '100%', height: 'auto' }} />
                  </div>
                ) : (
                  <IXSIcon>
                    <NewLogo width="130px" height="47px" />
                  </IXSIcon>
                )}
              </Title>
            </HeaderRow>
            <HeaderLinks />
            <HeaderControls>
              {isAllowed(routes.staking) && isAllowed(routes.vesting) && (
                <HeaderElement>
                  <IXSBalance />
                </HeaderElement>
              )}
              {account && !isUser ? <AdministrationMenu /> : null}
              <HeaderElement>
                {account ? <NetworkCard /> : ''}
                <Web3Status />

                {!account && openConnectModal ? (
                  <PinnedContentButton style={{ boxShadow: '0px 16px 16px 0px #6666FF21' }} onClick={openConnectModal}>
                    <Text className="connect-wallet-button">
                      <Trans>Connect Wallet</Trans>
                    </Text>
                  </PinnedContentButton>
                ) : null}

                {openPreviewModal && <BuyModal isOpen onClose={closeModal} />}
              </HeaderElement>
            </HeaderControls>
            <MobileMenu />
          </HeaderFrame>
        </HeaderWrapper>
      )}
    </>
  )
}

const HeaderFrame = styled.div<{ showBackground?: boolean; lightBackground?: boolean }>`
  display: grid;
  grid-template-columns: 0.3fr auto 0.5fr;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  top: 0;
  position: relative;
  padding: 1rem;
  z-index: 1;
  position: relative;
  background-color: white;
  background-image: ${({ theme }) => `linear-gradient(to bottom, transparent 50%, ${theme.bg0} 50%)`};
  background-position: ${({ showBackground }) => (showBackground ? '0 -100%' : '0 0')};
  background-size: 100% 200%;
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
    grid-template-columns: 1fr 1fr auto;
    padding: 10px 10px;
    grid-template-rows: auto;
    margin: 0;
  }
`

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: flex-end;
`

const HeaderElement = styled.div`
  display: flex;
  align-items: center;

  & > *:not(:first-child) {
    margin-left: 8px;
  }
`

const HeaderRow = styled(RowFixed)`
  width: 100%;
  margin-left: 16px;
`

const HeaderRowNew = styled(RowFixed)`
  width: 100%;
  display: flex;
  grid-gap: 28px;
  @media (max-width: 500px) {
    grid-gap: 12px;
  }
`

const Title = styled(Link)`
  display: flex;
  align-items: center;
  pointer-events: auto;
  justify-self: flex-start;
  margin-right: 12px;

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
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: space-between;
  position: fixed;
  top: 0;
  z-index: 2;

  ${({ theme }) => theme.mediaWidth.upToSmall`
  position: relative;
  `};

  ${({ theme }) =>
    theme.config.background &&
    css`
      background: ${({ theme }) => theme.config.background.secondary};
    `}
`

const IconWrapper = styled.div`
  display: block;
  cursor: pointer;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;
  `};
`
