import React from 'react'
import { NavLink } from 'react-router-dom'
import { darken } from 'polished'
import { Trans } from '@lingui/macro'
import styled from 'styled-components/macro'

import Row from '../Row'
import SettingsTab from 'components/Settings'
import { useDerivedSwapInfo } from 'state/swap/hooks'
import { routes } from 'utils/routes'
import { SECURITY_TOKENS } from 'config'

const activeClassName = 'ACTIVE'

const HeaderLinksWrap = styled(Row)`
  justify-self: center;
  background-color: 'transparent';
  width: fit-content;
  display: flex;
  flex-wrap: wrap;
  grid-gap: 2px 11px;
  overflow: visible;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    justify-self: flex-end;
  `};
  ${({ theme }) => theme.mediaWidth.upToSmall`
   margin: 0.5rem 0;
   justify-self: center;
  `};
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
   grid-gap: 5px 10px;
  `};
`
const StyledNavLink = styled(NavLink).attrs({
  activeClassName,
})`
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
  padding: 0 25px;
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

export const HeaderLinks = () => {
  const { allowedSlippage } = useDerivedSwapInfo()
  return (
    <HeaderLinksWrap>
      <StyledNavLink id={`swap-nav-link`} to={'/swap'}>
        <Trans>Swap</Trans>
      </StyledNavLink>
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
      {SECURITY_TOKENS && (
        <StyledNavLink id={`stake-nav-link`} to={routes.securityTokens()}>
          <Trans>Security tokens</Trans>
        </StyledNavLink>
      )}
      <SettingsTab placeholderSlippage={allowedSlippage} />
    </HeaderLinksWrap>
  )
}
