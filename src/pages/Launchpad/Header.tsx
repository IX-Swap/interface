import React from 'react'
import styled from 'styled-components'

import { Wallet } from 'components/Launchpad/Wallet'

import { ReactComponent as Logo } from 'assets/launchpad/svg/logo.svg'
import { routes } from 'utils/routes'
import { Link } from 'react-router-dom'
import { isDevelopment } from 'utils/isEnvMode'

export const Header = () => {
  return (
    <HeaderContainer>
      <TitleSection to="/launchpad">
        <Logo />
        <span className='bold-title'>IXS </span>
        <span className='dimmed-title'>Launchpad</span>
      </TitleSection>

      <HeaderLinks>
        <HeaderLink to={routes.swap}>Swap/Trade</HeaderLink>
        <HeaderLink to={routes.securityTokens()}>Security Tokens</HeaderLink>
        <HeaderLink to={routes.pool}>Liquidity Pools</HeaderLink>
        <HeaderLink to={routes.launchpad}>IXS Launchpad</HeaderLink>
        <HeaderLink to={'#'}>Farming</HeaderLink>
        <HeaderLink to={(isDevelopment ? 'https://dev.info.ixswap.io/' : 'https://info.ixswap.io/home')}>Charts</HeaderLink>
      </HeaderLinks>

      <Wallet />
    </HeaderContainer>
  )
}

const HeaderContainer = styled.div`
  display: flex;

  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;

  background: rgba(255, 255, 255, 0.75);
  box-shadow: 0px 2px 2px rgba(122, 122, 204, 0.08);
  backdrop-filter: blur(16px);

  padding: 0 10%;

  height: 80px;
  width: 100vw;
`

const HeaderLinks = styled.div`
  display: flex;

  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;

  gap: 1.5rem;

  flex-grow: 1;

  margin: 0 3rem;
`

const TitleSection = styled(Link)`
  display: flex;

  justify-content: flex-start;
  align-items: center;

  gap: 0.5rem;
  padding: 0.5rem 1rem;

  border-radius: 8px;

  text-decoration: none;

  transition: background 0.3s;

  :hover {
    background: ${props => props.theme.launchpad.colors.foreground};
  }

  .bold-title {
    font-style: normal;
    font-weight: 700;
    font-size: 18px;

    line-height: 22px;
    letter-spacing: -0.03em;

    color: ${props => props.theme.launchpad.colors.text.title};
  }

  .dimmed-title {
    font-style: normal;
    font-weight: 500;
    font-size: 18px;

    line-height: 22px;
    letter-spacing: -0.02em;

    color: ${props => props.theme.launchpad.colors.text.caption};
  }
`


const HeaderLink = styled(Link)`
  font-style: normal;
  font-weight: 500;
  font-size: 13px;

  text-decoration: none;

  line-height: 16px;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.text.title};

  transition: transform 0.1s ease-in-out;

  :hover {
    transform: scale(1.02);
  }
`
