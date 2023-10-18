// import { Trans } from '@lingui/macro'
// import React from 'react'
// import { useLogout } from 'state/admin/hooks'
// import styled from 'styled-components'

// export const Navbar = () => {
//   const logout = useLogout()

//   return (
//     <Container>
//       <Logout onClick={logout}>
//         <Trans>Logout</Trans>
//       </Logout>
//     </Container>
//   )
// }

// const Logout = styled.div`
//   cursor: pointer;
//   font-weight: 600;
//   font-size: 18px;
// `

// const Container = styled.div`
//   height: 21px;
//   margin-bottom: 26px;
//   text-align: right;
//   padding: 0 33px;
// `

import React, { useCallback } from 'react'
import { NavLink } from 'react-router-dom'
import { Text } from 'rebass'
import styled, { css } from 'styled-components'
import { useCookies } from 'react-cookie'

import { useKYCState } from 'state/kyc/hooks'
import { routes } from 'utils/routes'
import { ReactComponent as ProfileIcon } from 'assets/images/ProfileIcon.svg'
import { ReactComponent as TimerIcon } from 'assets/images/TimerIcon.svg'
import { ReactComponent as NewKYCLogo } from 'assets/images/newKYCLogo.svg'
import { ReactComponent as TokenManager } from 'assets/images/token-manager.svg'
import { isUserWhitelisted } from 'utils/isUserWhitelisted'
import { useActiveWeb3React } from '../../hooks/web3'

// import { MobileMenu } from '../Mobile-Menu'
// import { RowFixed } from '../Row'
// import Web3Status from '../Web3Status'
// import { HeaderLinks } from './HeaderLinks'
import { Announcement } from 'components/Announcement'

import { useWhitelabelState } from 'state/whitelabel/hooks'
import { useRole } from 'state/user/hooks'
import { ReactComponent as NewLogo } from 'assets/images/ix-swapNew.svg'
import { isMobile } from 'react-device-detect'
import { AdminHeaderLinks } from 'components/Header/HeaderLinks'
import { MobileMenu } from 'components/Mobile-Menu'
import { RowFixed } from 'components/Row'

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
`

const HeaderRowNew = styled(RowFixed)`
  width: 100%;
  display: flex;
  grid-gap: 28px;
  @media (max-width: 500px) {
    grid-gap: 12px;
  }
`

const AccountElement = styled.div`
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
  // background: ${({ theme }) => theme.bgG2};
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

const IconWrapper = styled.div`
  display: block;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;
  `};
`

export const Navbar = () => {
  const [cookies] = useCookies(['annoucementsSeen'])
  const { account, chainId } = useActiveWeb3React()
  const { kyc } = useKYCState()
  const { config } = useWhitelabelState()
  const { isTokenManager } = useRole()
  const isWhitelisted = isUserWhitelisted({ account, chainId })

  const isAllowed = useCallback(
    (path: string) => {
      if (!config || !config.pages || config.pages.length === 0) {
        return true
      }

      return config.pages.includes(path)
    },
    [config]
  )

  return (
    <>
      {isMobile && (
        <HeaderWrapper>
          <HeaderFrame>
            <HeaderRow>
              <Title href={config?.defaultUrl || '.'}>
                <IXSIcon>
                  <NewLogo width="auto" height="47px" {...config?.customStyles?.logo} />
                </IXSIcon>
              </Title>
            </HeaderRow>

            {/* <HeaderRowNew>
              <HeaderElement>
                <NavLink
                  style={{ textDecoration: 'none', color: 'inherit', marginRight: 8, marginTop: '4px' }}
                  to={routes.tokenManager('my-tokens', null)}
                >
                  <ProfileIcon width="50px" height="50px" />
                </NavLink>
              </HeaderElement>
            </HeaderRowNew>
            <HeaderElement>
              <NavLink style={{ textDecoration: 'none', color: 'inherit', marginTop: 5 }} to="/kyc">
                <TimerIcon width="50px" height="50px" />
              </NavLink>
            </HeaderElement> */}
            <MobileMenu isAdmin="true" />
          </HeaderFrame>
        </HeaderWrapper>
      )}
      {!isMobile && (
        <HeaderWrapper>
          <HeaderFrame>
            <HeaderRow marginLeft={100}>
              <Title href={config?.defaultUrl || '.'}>
                <IXSIcon>
                  <NewLogo width="auto" height="47px" {...config?.customStyles?.logo} />
                </IXSIcon>
              </Title>
            </HeaderRow>
            <AdminHeaderLinks />
            {/* <HeaderControls>
              <IconWrapper>
                <HeaderElement>
                  <NavLink
                    style={{ textDecoration: 'none', color: 'inherit', marginRight: 8 }}
                    to={routes.tokenManager('my-tokens', null)}
                  >
                    <ProfileIcon width="50px" height="50px" />
                  </NavLink>
                </HeaderElement>
              </IconWrapper>

              <IconWrapper>
                <HeaderElement>
                  <NavLink style={{ textDecoration: 'none', color: 'inherit' }} to="/kyc">
                    <TimerIcon width="50px" height="50px" />
                  </NavLink>
                </HeaderElement>
              </IconWrapper>
            </HeaderControls> */}
          </HeaderFrame>
        </HeaderWrapper>
      )}
    </>
  )
}
