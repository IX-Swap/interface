import React from 'react'
import styled, { css } from 'styled-components'
import { isMobile } from 'react-device-detect'
import _get from 'lodash/get'
import { Link } from 'react-router-dom'

import { useWhitelabelState } from 'state/whitelabel/hooks'
import { ReactComponent as NewLogo } from 'assets/images/ix-swapNew.svg'
import { AdminHeaderLinks } from 'components/Header/HeaderLinks'
import { MobileMenu } from 'components/Mobile-Menu'
import { RowFixed } from 'components/Row'
import { routes } from 'utils/routes'

export const Navbar = () => {
  const { config } = useWhitelabelState()

  const logoUrl = _get(config, 'logoUrl', null)

  return (
    <>
      {isMobile && (
        <HeaderWrapper>
          <HeaderFrame>
            <HeaderRow>
              <Title to={routes.defaultRoute}>
                {logoUrl ? (
                  <div style={{ width: 150 }}>
                    <img src={logoUrl} alt="logo" style={{ width: '100%', height: 'auto' }} />
                  </div>
                ) : (
                  <IXSIcon>
                    <NewLogo width="130px" height="47px" />
                  </IXSIcon>
                )}
              </Title>
            </HeaderRow>
            <MobileMenu isAdmin="true" />
          </HeaderFrame>
        </HeaderWrapper>
      )}
      {!isMobile && (
        <HeaderWrapper>
          <HeaderFrame>
            <HeaderRow marginLeft={100}>
              <Title to={routes.defaultRoute}>
                {logoUrl ? (
                  <div style={{ width: 150 }}>
                    <img src={logoUrl} alt="logo" style={{ width: '100%', height: 'auto' }} />
                  </div>
                ) : (
                  <IXSIcon>
                    <NewLogo width="130px" height="47px" />
                  </IXSIcon>
                )}
              </Title>
            </HeaderRow>
            <AdminHeaderLinks />
          </HeaderFrame>
        </HeaderWrapper>
      )}
    </>
  )
}

const HeaderFrame = styled.div<{ showBackground?: boolean; lightBackground?: boolean }>`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  top: 0;
  position: relative;
  padding: 1rem;
  z-index: 21;
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
    grid-template-columns: 1fr 1fr auto;
    grid-gap: 28px;
    padding: 14px 18px;
  }

  @media (max-width: 500px) {
    grid-template-columns: 1.5fr 1fr;
    padding: 10px 10px;
    grid-template-rows: auto;
    margin: 0;
    grid-gap: 2px;
  }
`

const HeaderRow = styled(RowFixed)`
  width: 100%;
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
  border-bottom: 1px solid #6666ff1a;

  ${({ theme }) =>
    theme.config.background &&
    css`
      background: ${({ theme }) => theme.config.background.secondary};
    `}
`
