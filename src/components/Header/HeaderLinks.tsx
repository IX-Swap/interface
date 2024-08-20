import React, { useCallback, useMemo, useRef } from 'react'
import { Trans } from '@lingui/macro'
import { darken } from 'polished'
import { NavLink } from 'react-router-dom'
import { css } from 'styled-components'
import styled from 'styled-components/macro'

import { ChevronElement } from 'components/ChevronElement'
import Column from 'components/Column'
import { Line } from 'components/Line'
import Popover from 'components/Popover'
import { SupportedChainId } from 'constants/chains'
import { useOnClickOutside } from 'hooks/useOnClickOutside'
import useToggle from 'hooks/useToggle'
import { useActiveWeb3React } from 'hooks/web3'
import { ExternalLink } from 'theme'
import { isUserWhitelisted } from 'utils/isUserWhitelisted'
import { routes } from 'utils/routes'
import { useWhitelabelState } from 'state/whitelabel/hooks'

import Row, { RowFixed } from '../Row'
import { useKyc, useRole } from 'state/user/hooks'

const activeClassName = 'ACTIVE'

const HeaderPopover = () => {
  const { config } = useWhitelabelState()

  const isAllowed = useCallback(
    (path: string): boolean => {
      if (!config || !config.pages || config.pages.length === 0) {
        return true
      }

      return config.pages.includes(path)
    },
    [config]
  )

  return (
    <PopOverContent
      onClick={(e: any) => (e ? e.stopPropagation() : null)}
      onMouseDown={(e: any) => (e ? e.stopPropagation() : null)}
    >
      <Column style={{ gap: 3 }}>
        {/* <TYPE.body2 fontWeight={600} marginBottom="4px">
          <Trans>Staking</Trans>
        </TYPE.body2> */}

        <SubMenuExternalLink style={{ fontSize: '13px' }} href={`https://ixswap.defiterm.io/`}>
          <Trans>Live Pools</Trans>
        </SubMenuExternalLink>
      </Column>

      <Row style={{ padding: '0', margin: '5px 0' }}>
        <Line />
      </Row>

      <Column style={{ gap: 3 }}>
        {/* <SubMenuExternalLink href={`https://ixswap.defiterm.io/`}>
          <Trans>Liquidity Mining Program (Quickswap)</Trans>
        </SubMenuExternalLink>

        <Row style={{ padding: '0', margin: '5px 0' }}>
          <Line />
        </Row> */}

        {isAllowed(routes.vesting) && (
          <SubMenuLink style={{ fontSize: '13px' }} id={`vesting-nav-link`} to={routes.vesting}>
            <Trans>Token Sale Distribution</Trans>
          </SubMenuLink>
        )}
      </Column>
    </PopOverContent>
  )
}

const NFTPopover = () => {
  return (
    <PopOverContent
      onClick={(e: any) => (e ? e.stopPropagation() : null)}
      onMouseDown={(e: any) => (e ? e.stopPropagation() : null)}
    >
      <SubMenuLink id={`nft-collections-nav-link`} to={routes.nftCollections} exact>
        <Trans>My Collections</Trans>
      </SubMenuLink>
      <SubMenuLink id={`nft-create-nav-link`} to={routes.nftCreate}>
        <Trans>Create NFT</Trans>
      </SubMenuLink>
      <SubMenuLink id={`nft-create-collection-nav-link`} to={routes.nftCollectionCreate} exact>
        <Trans>Create Collection</Trans>
      </SubMenuLink>
    </PopOverContent>
  )
}

export const HeaderLinks = () => {
  const [open, toggle] = useToggle(false)
  const [openNFT, toggleNFT] = useToggle(false)
  const { isCorporate, isApproved } = useKyc()
  const { isOfferManager, isAdmin } = useRole()
  const farmNode = useRef<HTMLDivElement>()
  const nftNode = useRef<HTMLDivElement>()

  const { config } = useWhitelabelState()
  const { chainId, account } = useActiveWeb3React()
  const bridgeUrl = process.env.REACT_APP_BRIDGE_URL || ''

  useOnClickOutside(farmNode, open ? toggle : undefined)
  useOnClickOutside(nftNode, openNFT ? toggleNFT : undefined)

  const isWhitelisted = isUserWhitelisted({ account, chainId })

  const isAllowed = useCallback(
    (path: string): boolean => {
      if (!config || !config.pages || config.pages.length === 0) {
        return true
      }

      return config.pages.includes(path)
    },
    [config]
  )

  const showIssuance = useMemo(
    () => account && (isAdmin || (isApproved && isOfferManager)),
    [account, isAdmin, isApproved, isOfferManager]
  )

  return (
    <HeaderLinksWrap links={7}>
      {isAllowed('/charts') && isWhitelisted && (
        <MenuExternalLink
          // disabled={!isApproved}
          target="_self"
          href={config?.chartsUrl || 'https://info.ixswap.io/home'}
        >
          <Trans>Charts</Trans>
        </MenuExternalLink>
      )}
      {config?.isIxSwap ? (
        <MenuExternalLink target="_blank" href={bridgeUrl}>
          <Trans>Bridge</Trans>
        </MenuExternalLink>
      ) : null}
      <StyledNavLink
        id={`issuance-nav-link`}
        to={'/launchpad'}
        isActive={(match, { pathname }) => {
          return pathname.includes('lbp/') || pathname.includes('launchpad')
        }}
      >
        <Trans>Launchpad</Trans>
      </StyledNavLink>

      {isAllowed(routes.securityTokens()) && isWhitelisted && (
        <StyledNavLink
          // disabled={!isApproved}
          data-testid="securityTokensButton"
          id={`stake-nav-link`}
          to={routes.securityTokens('tokens')}
          isActive={(match, { pathname }) => {
            return pathname.includes('security-token')
          }}
        >
          <Trans>RWAs</Trans>
        </StyledNavLink>
      )}

      {isAllowed(routes.pool) && isWhitelisted && (
        <StyledNavLink id={`pool-nav-link`} to={routes.pool}>
          <Trans>Liquidity Pools</Trans>
        </StyledNavLink>
      )}

      {isAllowed(routes.swap) && isWhitelisted && (
        <StyledNavLink id={`swap-nav-link`} to={routes.swap} data-testid={`swap-nav-link`}>
          <Trans>Swap/Trade</Trans>
        </StyledNavLink>
      )}

      {isAllowed(routes.vesting) && isAllowed(routes.staking) && (
        <StyledNavLink
          ref={farmNode as any}
          id={`farming-nav-link`}
          to={'#'}
          isActive={(match, { pathname }) => pathname.startsWith('/vesting') || pathname.startsWith('/staking')}
        >
          <Popover hideArrow show={open} content={<HeaderPopover />} placement={'bottom-start'}>
            <RowFixed onClick={toggle}>
              <Trans>Farming</Trans>
              <ChevronElement marginLeft={5} showMore={open} />
            </RowFixed>
          </Popover>
        </StyledNavLink>
      )}

      {isAllowed(routes.faucet) && chainId === SupportedChainId.KOVAN && isWhitelisted && (
        <StyledNavLink disabled={!isApproved} id={`faucet-nav-link`} to={routes.faucet}>
          <Trans>Faucet</Trans>
        </StyledNavLink>
      )}
    </HeaderLinksWrap>
  )
}

export const AdminHeaderLinks = () => {
  const { isAdmin } = useRole()

  return (
    <HeaderLinksWrap links={7}>
      {isAdmin && <StyledNavLink to="/admin/accreditation">Accreditation</StyledNavLink>}
      {isAdmin && <StyledNavLink to="/admin/kyc">KYC</StyledNavLink>}
      {isAdmin && <StyledNavLink to="/admin/transactions">Broker Dealer Transactions</StyledNavLink>}
      {isAdmin && <StyledNavLink to="/admin/security-catalog">Security Catalog</StyledNavLink>}
      {isAdmin && <StyledNavLink to="/admin/users-list">User’s</StyledNavLink>}
    </HeaderLinksWrap>
  )
}

const HeaderLinksWrap = styled(Row)<{ links: number }>`
  justify-self: center;
  background-color: 'transparent';
  width: fit-content;
  flex-wrap: wrap;
  overflow: visible;
  grid-gap: 30px;
  display: flex;
  align-items: center;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    justify-self: flex-end;
  `};
  @media (max-width: 1600px) {
    grid-gap: 15px;
  }
  @media (max-width: 1400px) {
    display: none;
  }
`

export const disabledStyle = css`
  cursor: initial;
  pointer-events: none;
  opacity: 0.2;
`

const navLinkStyles = css`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  font-size: 13px;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none !important;
  color: ${({ theme }) => theme.text12};
  width: fit-content;
  word-break: break-word;
  // opacity: 0.4;
  border-radius: 45px;
  font-weight: 500;
  &.${activeClassName} {
    opacity: 1;
    color: #b8b8cc;
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.05, theme.text11)};
    &.${activeClassName} {
      color: #b8b8cc;
    }
  }
  @media (max-width: 1500px) {
    font-size: 12px;
  }
  @media (max-width: 1300px) {
    font-size: 16px;
  }
  @media (max-width: 1250px) {
    font-size: 15px;
  }
`
const StyledNavLink = styled(NavLink).attrs({
  activeClassName,
})<{ disabled?: boolean }>`
  ${navLinkStyles};
  ${({ disabled }) => disabled && `${disabledStyle}`};
`

const subMenuLinkStyle = css`
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  text-transform: none;
  padding: 0 66px 0 0;
  :hover {
    color: ${({ theme }) => theme.text1};
    opacity: 1;
  }
`
const SubMenuLink = styled(StyledNavLink)`
  ${subMenuLinkStyle}
  &.${activeClassName} {
    color: ${({ theme }) => theme.text1};
  }
`
const SubMenuExternalLink = styled(ExternalLink)<{ disabled?: boolean }>`
  ${navLinkStyles};
  ${subMenuLinkStyle};
  :hover,
  :active,
  :focus {
    text-decoration: none;
  }
`
const MenuExternalLink = styled(ExternalLink)`
  ${navLinkStyles};
  ${({ disabled }) => disabled && `${disabledStyle}`};
`
const PopOverContent = styled.div`
  display: flex;
  gap: 6px;
  flex-direction: column;
  align-items: flex-start;
  padding: 15px 22px;
`
