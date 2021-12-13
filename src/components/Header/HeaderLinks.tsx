import { Trans } from '@lingui/macro'
import { ChevronElement } from 'components/ChevronElement'
import Popover from 'components/Popover'
import { SECURITY_TOKENS } from 'config'
import { useOnClickOutside } from 'hooks/useOnClickOutside'
import useToggle from 'hooks/useToggle'
import { darken } from 'polished'
import React, { useRef } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components/macro'
import { routes } from 'utils/routes'
import Row, { RowFixed } from '../Row'
import { css } from 'styled-components'
import { ExternalLink } from 'theme'
import { useActiveWeb3React } from 'hooks/web3'
import { MATIC_TGE_CHAINS, TGE_CHAINS_WITH_STAKING } from 'constants/addresses'
const activeClassName = 'ACTIVE'

const HeaderLinksWrap = styled(Row)<{ links: number }>`
  justify-self: center;
  background-color: 'transparent';
  width: fit-content;
  display: grid;
  flex-wrap: wrap;
  overflow: visible;
  grid-gap: 32px;
  grid-template-columns: ${({ links }) => `repeat(${links},auto)`};
  ${({ theme }) => theme.mediaWidth.upToMedium`
    justify-self: flex-end;
  `};
  @media (max-width: 1500px) {
    grid-gap: 18px;
  }
  @media (max-width: 1250px) {
    grid-gap: 12px;
  }
  @media (max-width: 1200px) {
    display: none;
  }
`
const navLinkStyles = css`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-transform: uppercase;
  text-decoration: none;
  color: ${({ theme }) => theme.text2};
  font-size: 20px;
  line-height: 30px;
  width: fit-content;
  word-break: break-word;
  opacity: 0.3;
  border-radius: 45px;
  font-weight: 600;
  &.${activeClassName} {
    opacity: 1;
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.05, theme.text2)};
  }
  @media (max-width: 1500px) {
    font-size: 18px;
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
})`
  ${navLinkStyles}
`
const subMenuLinkStyle = css`
  font-size: 16px;
  line-height: 24px;
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
const SubMenuExternalLink = styled(ExternalLink)`
  ${navLinkStyles};
  ${subMenuLinkStyle};
  :hover,
  :active,
  :focus {
    text-decoration: none;
  }
`
const PopOverContent = styled.div`
  display: flex;
  gap: 6px;
  flex-direction: column;
  align-items: flex-start;
  padding: 15px 22px;
`

const HeaderPopover = () => {
  const { chainId } = useActiveWeb3React()
  return (
    <PopOverContent
      onClick={(e) => (e ? e.stopPropagation() : null)}
      onMouseDown={(e) => (e ? e.stopPropagation() : null)}
    >
      {chainId !== undefined && TGE_CHAINS_WITH_STAKING.includes(chainId) && (
        <SubMenuLink id={`stake-nav-link`} to={routes.staking}>
          <Trans>Staking</Trans>
        </SubMenuLink>
      )}
      <SubMenuLink id={`vesting-nav-link`} to={routes.vesting}>
        <Trans>Vesting</Trans>
      </SubMenuLink>
      <SubMenuExternalLink href={`https://lm.ixswap.io/`}>
        <Trans>Liquidity Mining - Uniswap</Trans>
      </SubMenuExternalLink>
      <SubMenuExternalLink href={`https://ixswap.defiterm.io/`}>
        <Trans>DeFi Terminal</Trans>
      </SubMenuExternalLink>
    </PopOverContent>
  )
}

const NFTPopover = () => {
  return (
    <PopOverContent
      onClick={(e) => (e ? e.stopPropagation() : null)}
      onMouseDown={(e) => (e ? e.stopPropagation() : null)}
    >
      <SubMenuLink id={`nft-list-nav-link`} to={routes.nftList}>
        <Trans>My NFTs</Trans>
      </SubMenuLink>
      <SubMenuLink id={`nft-create-nav-link`} to={routes.nftCreate}>
        <Trans>Create NFT</Trans>
      </SubMenuLink>
    </PopOverContent>
  )
}

export const HeaderLinks = () => {
  const { chainId } = useActiveWeb3React()
  const [open, toggle] = useToggle(false)
  const [openNFT, toggleNFT] = useToggle(false)
  const farmNode = useRef<HTMLDivElement>()
  const nftNode = useRef<HTMLDivElement>()
  useOnClickOutside(farmNode, open ? toggle : undefined)
  useOnClickOutside(nftNode, openNFT ? toggleNFT : undefined)
  return (
    <HeaderLinksWrap links={SECURITY_TOKENS ? 6 : 5}>
      {chainId && !MATIC_TGE_CHAINS.includes(chainId) && (
        <StyledNavLink id={`swap-nav-link`} to={'/swap'}>
          <Trans>Secondary Market</Trans>
        </StyledNavLink>
      )}
      {chainId && !MATIC_TGE_CHAINS.includes(chainId) && (
        <StyledNavLink
          id={`pool-nav-link`}
          to={'/pool'}
          isActive={(match, { pathname }) =>
            Boolean(match) ||
            pathname.startsWith('/add') ||
            pathname.startsWith('/remove') ||
            pathname.startsWith('/find')
          }
        >
          <Trans>Liquidity Pool</Trans>
        </StyledNavLink>
      )}

      {SECURITY_TOKENS && (
        <StyledNavLink id={`stake-nav-link`} to={routes.securityTokens()}>
          <Trans>Security tokens</Trans>
        </StyledNavLink>
      )}

      <StyledNavLink
        ref={farmNode as any}
        id={`farming-nav-link`}
        to={'#'}
        isActive={(match, { pathname }) => pathname.startsWith('/vesting') || pathname.startsWith('/staking')}
      >
        <Popover hideArrow show={open} content={<HeaderPopover />} placement={'bottom'}>
          <RowFixed onClick={toggle}>
            <Trans>IXS Farms</Trans>
            <ChevronElement showMore={open} />
          </RowFixed>
        </Popover>
      </StyledNavLink>
      <StyledNavLink
        ref={nftNode as any}
        id={`nft-nav-link`}
        to={'#'}
        isActive={(match, { pathname }) => pathname.startsWith('/nft')}
      >
        <Popover hideArrow show={openNFT} content={<NFTPopover />} placement={'bottom'}>
          <RowFixed onClick={toggleNFT}>
            <Trans>NFT</Trans>
            <ChevronElement showMore={openNFT} />
          </RowFixed>
        </Popover>
      </StyledNavLink>
      {chainId && !MATIC_TGE_CHAINS.includes(chainId) && (
        <StyledNavLink id={`faucet-nav-link`} to={'/faucet'}>
          <Trans>Faucet</Trans>
        </StyledNavLink>
      )}
    </HeaderLinksWrap>
  )
}
