import React from 'react'
import styled from 'styled-components'

import { Wallet } from 'components/Launchpad/Wallet'
import Web3Status from 'components/Web3Status'

export const Header = () => {
  return (
    <HeaderContainer>
      <TitleSection>
        <span className='bold-title'>IXS </span>
        <span className='dimmed-title'>Launchpad</span>
      </TitleSection>

      <HeaderLinks>
        <Link>Swap/Trade</Link>
        <Link>Security Tokens</Link>
        <Link>Liquidity Pools</Link>
        <Link>IXS Launchpad</Link>
        <Link>FNFT</Link>
        <Link>Farming</Link>
        <Link>Charts</Link>
        <Link>Faucet</Link>
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

const TitleSection = styled.div`
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


const Link = styled.a`
  font-style: normal;
  font-weight: 500;
  font-size: 13px;

  line-height: 16px;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.text.title};
`
