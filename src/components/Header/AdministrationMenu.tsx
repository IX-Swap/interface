import React, { useMemo, useRef } from 'react'
import styled, { css } from 'styled-components'
import { darken } from 'polished'
import { NavLink } from 'react-router-dom'

import Column from 'components/Column'
import { ExternalLink } from 'theme'
import { checkAllowed, routes } from 'utils/routes'
import Popover from 'components/Popover'
import useToggle from 'hooks/useToggle'
import { useOnClickOutside } from 'hooks/useOnClickOutside'
import { ChevronElement } from 'components/ChevronElement'
import starIcon from 'assets/svg/star.svg'
import { useWhitelabelState } from 'state/whitelabel/hooks'
import { useKyc, useRole } from 'state/user/hooks'
import { useActiveWeb3React } from 'hooks/web3'
import { isUserWhitelisted } from 'utils/isUserWhitelisted'
import { BRIDGE_ADMIN_URL } from 'config'

const activeClassName = 'ACTIVE'

const Content = () => {
  const { config } = useWhitelabelState()
  const { chainId, account } = useActiveWeb3React()
  const { isOfferManager, isAdmin, isTokenManager, isOperator, isMasterTenant } = useRole()
  const { isApproved } = useKyc()
  const showIssuance = useMemo(
    () => account && (isAdmin || (isApproved && isOfferManager) || isMasterTenant),
    [account, isAdmin, isApproved, isOfferManager]
  )
  const isWhitelisted = isUserWhitelisted({ account, chainId })

  return (
    <PopoverContent
      onClick={(e: any) => (e ? e.stopPropagation() : null)}
      onMouseDown={(e: any) => (e ? e.stopPropagation() : null)}
    >
      {isAdmin ? (
        <Column>
          <SubMenuExternalLink href={BRIDGE_ADMIN_URL}>Bridge</SubMenuExternalLink>
        </Column>
      ) : null}

      {checkAllowed(routes.adminDashboard, config?.pages) && (isAdmin || isOperator) && isWhitelisted ? (
        <Column>
          <SubMenuLink to={routes.admin(isOperator ? 'kyc' : 'accreditation', null)}>Dashboard</SubMenuLink>
        </Column>
      ) : null}

      {checkAllowed(routes.issuance, config?.pages) && showIssuance ? (
        <Column>
          <SubMenuLink to={routes.issuance}>Issuance</SubMenuLink>
        </Column>
      ) : null}

      {checkAllowed(routes.tokenManager(), config?.pages) && isWhitelisted && (isTokenManager || isAdmin) ? (
        <Column>
          <SubMenuLink to={routes.tokenManager('my-tokens', null)}>Payout</SubMenuLink>
        </Column>
      ) : null}

      {checkAllowed(routes.lbpDashboard, config?.pages) && isAdmin && isWhitelisted ? (
        <Column>
          <SubMenuLink to={routes.lbpDashboard}>LBP</SubMenuLink>
        </Column>
      ) : null}
    </PopoverContent>
  )
}

const AdministrationMenu = () => {
  const [open, toggle] = useToggle(false)
  const node = useRef<HTMLDivElement>()

  useOnClickOutside(node, open ? toggle : undefined)

  return (
    <StyledNavLink
      ref={node as any}
      id={`administration-nav-link`}
      to={'#'}
      isActive={(match, { pathname }) => pathname.startsWith('/vesting') || pathname.startsWith('/staking')}
    >
      <Popover hideArrow show={open} content={<Content />} placement={'bottom-start'} offset={[0, 8]}>
        <StyledBox onClick={toggle}>
          <img src={starIcon} alt="star" />
          <div>Administration</div>
          <ChevronElement showMore={open} setShowMore={() => {}} />
        </StyledBox>
      </Popover>
    </StyledNavLink>
  )
}

export default AdministrationMenu

const PopoverContent = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  border-radius: 8px;
  border: solid 1px #e6e6ff;
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
    font-size: 14px;
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
  margin-right: 8px;
  min-width: 168px;
`

const subMenuLinkStyle = css`
  font-size: 14px;
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

const StyledBox = styled.div`
  font-size: 14px;
  border: 1px solid #e6e6ff;
  padding: 13px 12px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: center;

  @media (max-width: 1280px) {
    font-size: 12px;
  }

  :active {
    border: 1px solid #4d8fea;
  }
  :hover {
    transform: scale(0.99);
    transition: 0.2s;
    border: 1px solid #4d8fea;
  }
  position: relative;
`