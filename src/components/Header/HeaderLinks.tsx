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
  @media (max-width: 1080px) {
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
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
   font-size: 1rem;
  padding: 5px 13px;

  `};
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
export const HeaderLinks = () => {
  const [open, toggle] = useToggle(false)
  const node = useRef<HTMLDivElement>()
  const { chainId } = useActiveWeb3React()
  useOnClickOutside(node, open ? toggle : undefined)

  return (
    <HeaderLinksWrap links={SECURITY_TOKENS ? 4 : 3}>
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
          <Trans>Pool</Trans>
        </StyledNavLink>
      )}

      {SECURITY_TOKENS && (
        <StyledNavLink id={`stake-nav-link`} to={routes.securityTokens()}>
          <Trans>Security tokens</Trans>
        </StyledNavLink>
      )}

      <StyledNavLink
        ref={node as any}
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
    </HeaderLinksWrap>
  )
}
