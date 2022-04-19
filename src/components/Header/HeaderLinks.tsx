import { Trans } from '@lingui/macro'
import { ChevronElement } from 'components/ChevronElement'
import Column from 'components/Column'
import { Line } from 'components/Line'
import Popover from 'components/Popover'
import { ENV_SUPPORTED_TGE_CHAINS } from 'constants/addresses'
import { SupportedChainId } from 'constants/chains'
import { useOnClickOutside } from 'hooks/useOnClickOutside'
import useToggle from 'hooks/useToggle'
import { useActiveWeb3React } from 'hooks/web3'
import { KYCStatuses } from 'pages/KYC/enum'
import { darken } from 'polished'
import React, { useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { useKYCState } from 'state/kyc/hooks'
import { css } from 'styled-components'
import styled from 'styled-components/macro'
import { ExternalLink, TYPE } from 'theme'
import { isUserWhitelisted } from 'utils/isUserWhitelisted'
import { routes } from 'utils/routes'
import Row, { RowFixed } from '../Row'

const activeClassName = 'ACTIVE'

const HeaderPopover = () => {
  return (
    <PopOverContent
      onClick={(e) => (e ? e.stopPropagation() : null)}
      onMouseDown={(e) => (e ? e.stopPropagation() : null)}
    >
      <Column style={{ gap: 3 }}>
        <TYPE.body2 fontWeight={600} marginBottom="4px">
          <Trans>Staking</Trans>
        </TYPE.body2>

        <SubMenuExternalLink href={`https://ixswap.defiterm.io/`}>
          <Trans>Live Pools</Trans>
        </SubMenuExternalLink>

        <SubMenuLink id={`stake-nav-link`} to={routes.staking}>
          <Trans>Legacy Pools (Closed)</Trans>
        </SubMenuLink>
      </Column>

      <Row style={{ padding: '0', margin: '5px 0' }}>
        <Line />
      </Row>

      <Column style={{ gap: 3 }}>
        <SubMenuExternalLink href={`https://ixswap.defiterm.io/`}>
          <Trans>Liquidity Mining Program (Quickswap)</Trans>
        </SubMenuExternalLink>

        <Row style={{ padding: '0', margin: '5px 0' }}>
          <Line />
        </Row>

        <SubMenuLink id={`vesting-nav-link`} to={routes.vesting}>
          <Trans>Token Sale Distribution</Trans>
        </SubMenuLink>
      </Column>
    </PopOverContent>
  )
}

// const NFTPopover = () => {
//   return (
//     <PopOverContent
//       onClick={(e) => (e ? e.stopPropagation() : null)}
//       onMouseDown={(e) => (e ? e.stopPropagation() : null)}
//     >
//       <SubMenuLink id={`nft-collections-nav-link`} to={routes.nftCollections} exact>
//         <Trans>My Collections</Trans>
//       </SubMenuLink>
//       <SubMenuLink id={`nft-create-nav-link`} to={routes.nftCreate}>
//         <Trans>Create NFT</Trans>
//       </SubMenuLink>
//       <SubMenuLink id={`nft-create-collection-nav-link`} to={routes.nftCollectionCreate} exact>
//         <Trans>Create Collection</Trans>
//       </SubMenuLink>
//     </PopOverContent>
//   )
// }

export const HeaderLinks = () => {
  const { chainId, account } = useActiveWeb3React()
  const [open, toggle] = useToggle(false)
  const [openNFT, toggleNFT] = useToggle(false)
  const farmNode = useRef<HTMLDivElement>()
  const nftNode = useRef<HTMLDivElement>()
  const { kyc } = useKYCState()
  useOnClickOutside(farmNode, open ? toggle : undefined)
  useOnClickOutside(nftNode, openNFT ? toggleNFT : undefined)
  const isWhitelisted = isUserWhitelisted({ account, chainId })
  const isKycApproved = kyc?.data?.status === KYCStatuses.APPROVED ?? false
  const isDev = ['test development env', 'development'].includes(process.env.NODE_ENV)
  const chains = ENV_SUPPORTED_TGE_CHAINS || [42]

  return (
    <HeaderLinksWrap links={7}>
      {account && chainId && chains.includes(chainId) && isWhitelisted && (
        <StyledNavLink id={`swap-nav-link`} to={'/swap'}>
          <Trans>Swap/Trade</Trans>
        </StyledNavLink>
      )}

      {account && chainId && chains.includes(chainId) && isWhitelisted && (
        <StyledNavLink disabled={!isKycApproved} id={`stake-nav-link`} to={routes.securityTokens()}>
          <Trans>Security Tokens</Trans>
        </StyledNavLink>
      )}

      {account && chainId && chains.includes(chainId) && isWhitelisted && (
        <StyledNavLink id={`pool-nav-link`} to={'/pool'}>
          <Trans>Liquidity pools</Trans>
        </StyledNavLink>
      )}

      {account && chainId && chains.includes(chainId) && isWhitelisted && (
        <MenuExternalLink
          disabled={!isKycApproved}
          target="_self"
          href={'https://ixswap.io/fractionalized-nfts-coming-soon-on-ix-swap/'}
        >
          <Trans>FNFT</Trans>
        </MenuExternalLink>
      )}

      {/* {account && chainId && chainId === SupportedChainId.KOVAN && isWhitelisted && isDev && (
        <StyledNavLink
          ref={nftNode as any}
          id={`nft-nav-link`}
          to={'#'}
          isActive={(match, { pathname }) => pathname.startsWith('/nft')}
        >
          <Popover hideArrow show={openNFT} content={<NFTPopover />} placement={'bottom-start'}>
            <RowFixed onClick={toggleNFT}>
              <Trans>NFT</Trans>
              <ChevronElement showMore={openNFT} />
            </RowFixed>
          </Popover>
        </StyledNavLink>
      )} */}

      {account && chainId && account && (
        <StyledNavLink
          ref={farmNode as any}
          id={`farming-nav-link`}
          to={'#'}
          isActive={(match, { pathname }) => pathname.startsWith('/vesting') || pathname.startsWith('/staking')}
        >
          <Popover hideArrow show={open} content={<HeaderPopover />} placement={'bottom-start'}>
            <RowFixed onClick={toggle}>
              <Trans>Farming</Trans>
              <ChevronElement showMore={open} />
            </RowFixed>
          </Popover>
        </StyledNavLink>
      )}

      {account && isWhitelisted && (
        <MenuExternalLink
          disabled={!isKycApproved}
          target="_self"
          href={isDev ? 'https://dev.info.ixswap.io/' : 'https://info.ixswap.io/home'}
        >
          <Trans>Charts</Trans>
        </MenuExternalLink>
      )}

      {account && chainId && chainId === SupportedChainId.KOVAN && isWhitelisted && (
        <StyledNavLink disabled={!isKycApproved} id={`faucet-nav-link`} to={'/faucet'}>
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
  flex-wrap: wrap;
  overflow: visible;
  grid-gap: 32px;
  display: flex;
  align-items: center;
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

export const disabledStyle = css`
  cursor: initial;
  pointer-events: none;
  opacity: 0.2;
`

const navLinkStyles = css`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none !important;
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
