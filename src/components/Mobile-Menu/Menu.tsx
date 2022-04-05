import { Trans } from '@lingui/macro'
import { ENV_SUPPORTED_TGE_CHAINS } from 'constants/addresses'
import { SupportedChainId } from 'constants/chains'
import { useActiveWeb3React } from 'hooks/web3'
import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { ExternalLink } from 'theme'
import { routes } from 'utils/routes'
import { isUserWhitelisted } from 'utils/isUserWhitelisted'

import closeIcon from '../../assets/images/cross.svg'
interface Props {
  close: () => void
}

export const Menu = ({ close }: Props) => {
  const { chainId, account } = useActiveWeb3React()

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0]
    if (body) {
      body.setAttribute('style', 'overflow:hidden')
    }
    return () => {
      if (body) {
        body.removeAttribute('style')
      }
    }
  }, [])

  const isWhitelisted = isUserWhitelisted({ account, chainId })

  const chains = ENV_SUPPORTED_TGE_CHAINS || [137]

  return (
    <ModalContainer>
      <Container>
        <CloseContainer>
          <CloseIcon src={closeIcon} alt={closeIcon} onClick={close} />
        </CloseContainer>
        <MenuList>
          {chainId && chains.includes(chainId) && isWhitelisted && (
            <MenuListItem id={`swap-nav-link`} to={'/swap'} onClick={close}>
              <Trans>Swap</Trans>
            </MenuListItem>
          )}
          {chainId && chains.includes(chainId) && isWhitelisted && (
            <MenuListItem
              id={`pool-nav-link`}
              to={'/pool'}
              isActive={(match, { pathname }) =>
                Boolean(match) ||
                pathname.startsWith('/add') ||
                pathname.startsWith('/remove') ||
                pathname.startsWith('/find')
              }
              onClick={close}
            >
              <Trans>Pools</Trans>
            </MenuListItem>
          )}

          {chainId && chains.includes(chainId) && isWhitelisted && (
            <MenuListItem id={`stake-nav-link`} to={routes.securityTokens()} onClick={close}>
              <Trans>Securities</Trans>
            </MenuListItem>
          )}
          <ExternalListItem href={`https://ixswap.defiterm.io/`}>
            <Trans>Live Pools</Trans>
          </ExternalListItem>

          <MenuListItem activeClassName="active-item" id={`stake-nav-link`} to={routes.staking} onClick={close}>
            <Trans>Legacy Pools (Closed)</Trans>
          </MenuListItem>

          <MenuListItem activeClassName="active-item" id={`vesting-nav-link`} to={routes.vesting} onClick={close}>
            <Trans>Token Sale Distribution</Trans>
          </MenuListItem>

          <ExternalListItem href={`https://ixswap.defiterm.io/`}>
            <Trans>Liquidity Mining Program (Quickswap)</Trans>
          </ExternalListItem>

          {isWhitelisted && (
            <ExternalListItem target="_self" href={'https://info.ixswap.io/home'}>
              <Trans>Charts</Trans>
            </ExternalListItem>
          )}

          {chainId && chainId === SupportedChainId.KOVAN && isWhitelisted && (
            <MenuListItem id={`faucet-nav-link`} to={'/faucet'} onClick={close}>
              <Trans>Faucet</Trans>
            </MenuListItem>
          )}
          <MenuListItem activeClassName="active-item" id={`kyc-nav-link`} to={'/kyc'} onClick={close}>
            <Trans>KYC</Trans>
          </MenuListItem>
        </MenuList>
      </Container>
    </ModalContainer>
  )
}

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  backdrop-filter: blur(36px);
  z-index: 9999;
  padding: 32px 18px;
  display: none;
  background: ${({ theme }) => theme.bgG16};
  @media (max-width: 1400px) {
    display: block;
    overflow-y: scroll;
  }
`

const Container = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const CloseContainer = styled.div`
  text-align: right;
  position: absolute;
  top: 0;
  right: 0;
`

const CloseIcon = styled.img`
  width: 18px;
  height: 18px;
  cursor: pointer;
`

const MenuList = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-gap: 6px;
  justify-content: center;
`
const listItemStyle = css`
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 22px;
  text-transform: uppercase;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  color: ${({ theme }) => theme.text2};
  opacity: 0.6;
  &.active-item {
    opacity: 1;
    color: white;
  }
`
const MenuListItem = styled(NavLink)`
  ${listItemStyle};
`
const ExternalListItem = styled(ExternalLink)`
  ${listItemStyle};
  :hover,
  :active,
  :focus {
    text-decoration: none;
  }
`
