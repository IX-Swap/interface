import { Trans } from '@lingui/macro'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { SECURITY_TOKENS } from 'config'

import { routes } from 'utils/routes'

import closeIcon from '../../assets/images/cross.svg'

interface Props {
  close: () => void
}

export const Menu = ({ close }: Props) => {
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

  return (
    <ModalContainer>
      <Container>
        <CloseContainer>
          <CloseIcon src={closeIcon} alt={closeIcon} onClick={close} />
        </CloseContainer>
        <MenuList>
          <MenuListItem id={`swap-nav-link`} to={'/swap'} onClick={close} activeClassName="active-item">
            <Trans>SWAP</Trans>
          </MenuListItem>
          <MenuListItem
            onClick={close}
            id={`pool-nav-link`}
            to={'/pool'}
            activeClassName="active-item"
            isActive={(match, { pathname }) =>
              Boolean(match) ||
              pathname.startsWith('/add') ||
              pathname.startsWith('/remove') ||
              pathname.startsWith('/find')
            }
          >
            <Trans>POOL</Trans>
          </MenuListItem>
          {SECURITY_TOKENS && (
            <MenuListItem
              activeClassName="active-item"
              id={`stake-nav-link`}
              to={routes.securityTokens()}
              onClick={close}
            >
              <Trans>Security tokens</Trans>
            </MenuListItem>
          )}
          <MenuListItem activeClassName="active-item" id={`stake-nav-link`} to={routes.staking} onClick={close}>
            <Trans>Staking IXS</Trans>
          </MenuListItem>
          <MenuListItem activeClassName="active-item" id={`vesting-nav-link`} to={routes.vesting} onClick={close}>
            <Trans>Vesting IXS</Trans>
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
  height: 100vh;
  backdrop-filter: blur(36px);
  z-index: 9999;
  padding: 32px 18px;
  display: none;
  background: ${({ theme }) => theme.bgG16};
  @media (max-width: 1080px) {
    display: block;
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
  grid-gap: 8px;
  justify-content: center;
`

const MenuListItem = styled(NavLink)`
  height: 56px;
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
