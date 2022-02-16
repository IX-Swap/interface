import { Trans } from '@lingui/macro'
import { ChevronElement } from 'components/ChevronElement'
import Popover from 'components/Popover'
import { MATIC_TGE_CHAINS, TGE_CHAINS_WITH_STAKING, TGE_CHAINS_WITH_SWAP } from 'constants/addresses'
import { SupportedChainId } from 'constants/chains'
import { useOnClickOutside } from 'hooks/useOnClickOutside'
import useToggle from 'hooks/useToggle'
import { useActiveWeb3React } from 'hooks/web3'
import { darken } from 'polished'
import React, { useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { css } from 'styled-components'
import styled from 'styled-components/macro'
import { ExternalLink } from 'theme'
import { routes } from 'utils/routes'
import Row, { RowFixed } from '../Row'
const activeClassName = 'ACTIVE'

const HeaderPopover = () => {
  const { chainId } = useActiveWeb3React()
  return (
    <PopOverContent
      onClick={(e) => (e ? e.stopPropagation() : null)}
      onMouseDown={(e) => (e ? e.stopPropagation() : null)}
    >
      <SubMenuExternalLink href={`https://ixswap.defiterm.io/`}>
        <Trans>Staking - New</Trans>
      </SubMenuExternalLink>

      {chainId !== undefined && TGE_CHAINS_WITH_STAKING.includes(chainId) && (
        <SubMenuLink id={`stake-nav-link`} to={routes.staking}>
          <Trans>Staking - Old</Trans>
        </SubMenuLink>
      )}

      <SubMenuLink id={`vesting-nav-link`} to={routes.vesting}>
        <Trans>Vesting</Trans>
      </SubMenuLink>

      <SubMenuExternalLink href={`https://ixswap.defiterm.io/`}>
        <Trans>Liquidity Mining - Polygon</Trans>
      </SubMenuExternalLink>

      <SubMenuExternalLink
        href={`https://app.uniswap.org/#/add/v2/ETH/0x73d7c860998CA3c01Ce8c808F5577d94d545d1b4?chain=mainnet)`}
      >
        <Trans>Liquidity Mining - Ethereum</Trans>
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
  const { chainId } = useActiveWeb3React()
  const [open, toggle] = useToggle(false)
  const [openNFT, toggleNFT] = useToggle(false)
  const farmNode = useRef<HTMLDivElement>()
  const nftNode = useRef<HTMLDivElement>()
  useOnClickOutside(farmNode, open ? toggle : undefined)
  useOnClickOutside(nftNode, openNFT ? toggleNFT : undefined)
  return (
    <HeaderLinksWrap links={7}>
      {chainId && !MATIC_TGE_CHAINS.includes(chainId) && (
        <StyledNavLink id={`swap-nav-link`} to={'/swap'}>
          <Trans>Swap</Trans>
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
          <Trans>Pools</Trans>
        </StyledNavLink>
      )}

      <StyledNavLink id={`stake-nav-link`} to={routes.securityTokens()}>
        <Trans>Securities</Trans>
      </StyledNavLink>

      {chainId && TGE_CHAINS_WITH_SWAP.includes(chainId) && (
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
      )}

      <StyledNavLink
        ref={farmNode as any}
        id={`farming-nav-link`}
        to={'#'}
        isActive={(match, { pathname }) => pathname.startsWith('/vesting') || pathname.startsWith('/staking')}
      >
        <Popover hideArrow show={open} content={<HeaderPopover />} placement={'bottom'}>
          <RowFixed onClick={toggle}>
            <Trans>Farming</Trans>
            <ChevronElement showMore={open} />
          </RowFixed>
        </Popover>
      </StyledNavLink>

      {chainId && chainId === SupportedChainId.KOVAN && (
        <MenuExternalLink href={'https://info.ixswap.io/home'}>
          <Trans>Charts</Trans>
        </MenuExternalLink>
      )}

      {chainId && !MATIC_TGE_CHAINS.includes(chainId) && (
        <StyledNavLink id={`faucet-nav-link`} to={'/faucet'}>
          <Trans>Faucet</Trans>
        </StyledNavLink>
      )}
    </HeaderLinksWrap>
  )
}

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
  @media (max-width: 1600px) {
    grid-gap: 18px;
  }
  @media (max-width: 1400px) {
    display: none;
  }
`
const navLinkStyles = css`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text2};
  width: fit-content;
  word-break: break-word;
  opacity: 0.4;
  border-radius: 45px;
  font-weight: 600;
  &.${activeClassName} {
    opacity: 1;
    color: ${({ theme }) => theme.white};
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.05, theme.text2)};
    &.${activeClassName} {
      color: ${({ theme }) => theme.white};
    }
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
const MenuExternalLink = styled(ExternalLink)`
  ${navLinkStyles};
`
const PopOverContent = styled.div`
  display: flex;
  gap: 6px;
  flex-direction: column;
  align-items: flex-start;
  padding: 15px 22px;
`
