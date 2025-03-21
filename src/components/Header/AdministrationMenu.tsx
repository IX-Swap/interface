import React, { useMemo, useRef } from 'react'
import styled, { css } from 'styled-components'
import { darken } from 'polished'
import { useHistory } from 'react-router-dom'

import Column from 'components/Column'
import { ExternalLink, MEDIA_WIDTHS } from 'theme'
import { checkAllowed, routes } from 'utils/routes'
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

interface ContentProps {
  open: boolean
  toggle: () => void
}

const Content: React.FC<ContentProps> = ({ open, toggle }) => {
  const { config } = useWhitelabelState()
  const { chainId, account } = useActiveWeb3React()
  const { isOfferManager, isAdmin, isTokenManager, isOperator, isMasterTenant } = useRole()
  const { isApproved } = useKyc()
  const showIssuance = useMemo(
    () => account && (isAdmin || (isApproved && isOfferManager) || isMasterTenant),
    [account, isAdmin, isApproved, isOfferManager]
  )
  const isWhitelisted = isUserWhitelisted({ account, chainId })
  const history = useHistory()

  const navigateTo = (path: string) => {
    history.replace(path)
    open ? toggle() : null
  }

  return (
    <PopoverContent>
      {isAdmin ? (
        <Column>
          <SubMenuExternalLink href={BRIDGE_ADMIN_URL}>Bridge</SubMenuExternalLink>
        </Column>
      ) : null}

      {checkAllowed(routes.adminDashboard, config?.pages) && (isAdmin || isOperator) && isWhitelisted ? (
        <Column>
          <Link onClick={() => navigateTo(routes.admin(isOperator ? 'kyc' : 'accreditation', null))}>Dashboard</Link>
        </Column>
      ) : null}

      {checkAllowed(routes.issuance, config?.pages) && showIssuance ? (
        <Column>
          <Link onClick={() => navigateTo(routes.issuance)}>Issuance</Link>
        </Column>
      ) : null}

      {checkAllowed(routes.tokenManager('my-tokens', null), config?.pages) &&
      isWhitelisted &&
      (isTokenManager || isAdmin) ? (
        <Column>
          <Link onClick={() => navigateTo(routes.tokenManager('my-tokens', null))}>Payout</Link>
        </Column>
      ) : null}

      {checkAllowed(routes.lbpDashboard, config?.pages) && isAdmin && isWhitelisted ? (
        <Column>
          <Link onClick={() => navigateTo(routes.lbpDashboard)}>LBP</Link>
        </Column>
      ) : null}

      {isAdmin ? (
        <Column>
          <Link onClick={() => navigateTo(routes.tenant)}>SaaS configuration</Link>
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
    <StyledBox>
      <Container ref={node as any}>
        <SelectorControls onClick={toggle}>
          <img src={starIcon} alt="star" />
          <div>Administration</div>
          <ChevronElement showMore={open} setShowMore={() => {}} />
        </SelectorControls>

        {open && <Content open={open} toggle={toggle} />}
      </Container>
    </StyledBox>
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
  position: absolute;
  top: 70px;
  width: 250px;
  z-index: 99;
  background: white;
  @media screen and (min-width: ${MEDIA_WIDTHS.upToSmall}px) {
    top: 54px;
    left: 0;
  }
  @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
    right: 70px;
    left: 0;
  }
  @media screen and (max-width: 400px) {
    right: 30px;
    left: 0;
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
`
const Container = styled.div`
  margin-right: 8px;
  min-width: 168px;
  cursor: pointer;
`

const subMenuLinkStyle = css`
  font-size: 13px;
  line-height: 24px;
  font-weight: 500;
  text-transform: none;
  padding: 0 66px 0 0;
  :hover {
    color: ${({ theme }) => theme.text1};
    opacity: 1;
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

const SelectorControls = styled.div`
  font-size: 13px;
  font-weight: 500;
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

const Link = styled.div`
  font-size: 13px;
  line-height: 24px;
  font-weight: 500;
  text-transform: none;
  padding: 0 66px 0 0;
  cursor: pointer;
  color: #292933;

  &:hover {
    color: #b8b8cc;
  }
`

const StyledBox = styled.div`
  position: relative;
`
