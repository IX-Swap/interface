import { Trans } from '@lingui/macro'
import { ENV_SUPPORTED_TGE_CHAINS } from 'constants/addresses'
import { SupportedChainId } from 'constants/chains'
import { useActiveWeb3React } from 'hooks/web3'
import React, { useCallback, useEffect, useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { ExternalLink } from 'theme'
import { routes } from 'utils/routes'
import { isUserWhitelisted } from 'utils/isUserWhitelisted'

import { ReactComponent as CloseIcon } from '../../assets/images/cross.svg'
import { disabledStyle } from 'components/Header/HeaderLinks'
import { useWhitelabelState } from 'state/whitelabel/hooks'
import { useKyc, useRole } from 'state/user/hooks'

interface Props {
  close: () => void
  isAdminMenu?: string
}

export const Menu = ({ close, isAdminMenu }: Props) => {
  const { chainId, account } = useActiveWeb3React()
  const { config } = useWhitelabelState()

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

  const isAllowed = useCallback(
    (path: string): boolean => {
      if (!config || !config.pages || config.pages.length === 0) {
        return true
      }

      return config.pages.includes(path)
    },
    [config]
  )

  const { isCorporate, isApproved } = useKyc()
  const { isOfferManager, isAdmin } = useRole()

  const showIssuance = useMemo(
    () => account && (isAdmin || (isCorporate && isApproved && isOfferManager)),
    [account, isAdmin, isCorporate, isApproved, isOfferManager]
  )
  return isAdminMenu ? (
    <ModalContainer>
      <CloseContainer>
        <StyledCloseIcon onClick={close} />
      </CloseContainer>
      <Container>
        <MenuList>
          <MenuListItem id={`admin-accreditation-nav-link`} to="/admin/accreditation" onClick={close}>
            <Trans>Accreditation</Trans>
          </MenuListItem>
          <MenuListItem id={`admin-kyc-nav-link`} to="/admin/kyc" onClick={close}>
            <Trans>KYC</Trans>
          </MenuListItem>
          <MenuListItem id={`admin-transactions-nav-link`} to="/admin/transactions" onClick={close}>
            <Trans>Broker Dealer Transactions</Trans>
          </MenuListItem>
          <MenuListItem id={`admin-security-nav-link`} to="/admin/security-catalog" onClick={close}>
            <Trans>Security Catalog</Trans>
          </MenuListItem>
          <MenuListItem id={`admin-users-nav-link`} to="/admin/users-list" onClick={close}>
            <Trans>User’s</Trans>
          </MenuListItem>
        </MenuList>
      </Container>
    </ModalContainer>
  ) : (
    <ModalContainer>
      <Container>
        <CloseContainer>
          <StyledCloseIcon onClick={close} />
        </CloseContainer>
        <MenuList>
          {isAllowed('/swap') && chainId && chains.includes(chainId) && isWhitelisted && (
            <MenuListItem id={`swap-nav-link`} to={'/swap'} onClick={close} data-testid={`swap-nav-link`}>
              <Trans>Swap/Trade</Trans>
            </MenuListItem>
          )}

          {isAllowed(routes.securityTokens()) && chainId && chains.includes(chainId) && isWhitelisted && (
            <MenuListItem
              disabled={!isApproved}
              id={`security-nav-link`}
              to={routes.securityTokens('tokens')}
              onClick={close}
            >
              <Trans>Security Tokens</Trans>
            </MenuListItem>
          )}

          {isAllowed('/pool') && chainId && chains.includes(chainId) && isWhitelisted && (
            <MenuListItem id={`pool-nav-link`} to={`/pool`} onClick={close}>
              <Trans>Liquidity Pools</Trans>
            </MenuListItem>
          )}

          {chainId && chains.includes(chainId) && isWhitelisted && (
            <ExternalListItem
              disabled={!isApproved}
              target="_self"
              href={'https://ixswap.io/fractionalized-nfts-coming-soon-on-ix-swap/'}
            >
              <Trans>FNFT</Trans>
            </ExternalListItem>
          )}

          {isAllowed(routes.vesting) && isAllowed(routes.staking) && (
            <ExternalListItem href={`https://ixswap.defiterm.io/`}>
              <Trans>Live Pools</Trans>
            </ExternalListItem>
          )}

          {isAllowed(routes.vesting) && (
            <MenuListItem activeClassName="active-item" id={`vesting-nav-link`} to={routes.vesting} onClick={close}>
              <Trans>Token Sale Distribution</Trans>
            </MenuListItem>
          )}

          {isAllowed(routes.vesting) && isAllowed(routes.staking) && (
            <ExternalListItem href={`https://ixswap.defiterm.io/`}>
              <Trans>Liquidity Mining Program (Quickswap)</Trans>
            </ExternalListItem>
          )}

          {isWhitelisted && (
            <ExternalListItem disabled={!isApproved} target="_self" href={'https://info.ixswap.io/home'}>
              <Trans>Charts</Trans>
            </ExternalListItem>
          )}

          {isAllowed('/faucet') && chainId && chainId === SupportedChainId.KOVAN && isWhitelisted && (
            <MenuListItem disabled={!isApproved} id={`faucet-nav-link`} to={'/faucet'} onClick={close}>
              <Trans>Faucet</Trans>
            </MenuListItem>
          )}

          {isAllowed('/kyc') && (
            <MenuListItem activeClassName="active-item" id={`kyc-nav-link`} to={'/kyc'} onClick={close}>
              <Trans>KYC</Trans>
            </MenuListItem>
          )}
          {isAllowed(routes.tokenManager()) && (
            <MenuListItem
              activeClassName="active-item"
              id={`kyc-nav-link`}
              to={routes.tokenManager('my-tokens', null)}
              onClick={close}
            >
              <Trans>Token Manager</Trans>
            </MenuListItem>
          )}

          <MenuListItem activeClassName="active-item" id={`issuance-nav-link`} to={'/launchpad'} onClick={close}>
            <Trans>Launchpad</Trans>
          </MenuListItem>
          {showIssuance && (
            <MenuListItem
              activeClassName="active-item"
              id={`issuance-dashboard-nav-link`}
              to="/issuance"
              onClick={close}
            >
              <Trans>Issuance Dashboard</Trans>
            </MenuListItem>
          )}
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
  display: flex;
  align-items: center;
  justify-content: center;
`

const CloseContainer = styled.div`
  text-align: right;
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 9999;
`

const StyledCloseIcon = styled(CloseIcon)`
  width: 18px;
  height: 18px;
  cursor: pointer;
  z-index: 9999;
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
  color: ${({ theme }) => theme.config?.text?.main || theme.text2};
  opacity: 0.6;
  &.active-item {
    opacity: 1;
    color: white;
  }
`
const MenuListItem = styled(NavLink)<{ disabled?: boolean }>`
  ${listItemStyle};
  ${({ disabled }) => disabled && `${disabledStyle}`};
`
const ExternalListItem = styled(ExternalLink)`
  ${listItemStyle};
  :hover,
  :active,
  :focus {
    text-decoration: none;
  }

  ${({ disabled }) => disabled && `${disabledStyle}`};
`
