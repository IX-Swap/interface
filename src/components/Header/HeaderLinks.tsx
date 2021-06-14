import React from 'react'
import { NavLink } from 'react-router-dom'
import { darken } from 'polished'
import { Trans } from '@lingui/macro'
import styled from 'styled-components/macro'

import Row from '../Row'
import SettingsTab from 'components/Settings'
import { useDerivedSwapInfo } from 'state/swap/hooks'

const activeClassName = 'ACTIVE'
enum Side {
  left = 'left',
  right = 'right',
}
const HeaderLinksWrap = styled(Row)`
  justify-self: center;
  background-color: ${({ theme }) => theme.bg0};
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
  font-weight: 500;
  padding: 9px 34px;
  word-break: break-word;
  background: ${({ theme }) => theme.bgGradient};
  opacity: 0.3;
  border-radius: 45px;
  font-weight: 600;
  &.${activeClassName} {
    opacity: 1;
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
   font-size: 1rem;
  padding: 5px 13px;

  `};
`
const StyledJointLinkWrapper = styled.div`
  display: flex;
`

const StyledJointLink = styled(StyledNavLink)<{ side: Side }>`
  border-radius: ${({ side }) => (side === Side.left ? '45px 0 0 45px' : '0 45px 45px 0')};
`

export const HeaderLinks = () => {
  const { allowedSlippage } = useDerivedSwapInfo()
  return (
    <HeaderLinksWrap>
      <StyledJointLinkWrapper>
        <StyledJointLink id={`swap-nav-link`} to={'/swap'} side={Side.left}>
          <Trans>Swap</Trans>
        </StyledJointLink>
        <StyledJointLink
          side={Side.right}
          id={`pool-nav-link`}
          to={'/pool'}
          isActive={(match, { pathname }) =>
            Boolean(match) ||
            pathname.startsWith('/add') ||
            pathname.startsWith('/remove') ||
            pathname.startsWith('/increase') ||
            pathname.startsWith('/find')
          }
        >
          <Trans>Pool</Trans>
        </StyledJointLink>
      </StyledJointLinkWrapper>
      <StyledNavLink id={`stake-nav-link`} to={'/vote'}>
        <Trans>Custodian</Trans>
      </StyledNavLink>
      <SettingsTab placeholderSlippage={allowedSlippage} />
    </HeaderLinksWrap>
  )
}
