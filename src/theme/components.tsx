import React, { HTMLProps } from 'react'
import ReactGA from 'react-ga'
import { Link } from 'react-router-dom'
import styled, { css, keyframes } from 'styled-components'
import { darken } from 'polished'
import { ArrowLeft, X, ExternalLink as LinkIconFeather, Trash } from 'react-feather'
import { ReactComponent as Check } from 'assets/images/check.svg'
import Column, { ColumnCenter } from 'components/Column'
import { TYPE } from 'theme'
import { Trans } from '@lingui/macro'
export const ButtonText = styled.button`
  outline: none;
  border: none;
  font-size: inherit;
  padding: 0;
  margin: 0;
  background: none;
  cursor: pointer;

  :hover {
    opacity: 0.7;
  }

  :focus {
    text-decoration: underline;
  }
`

export const Button = styled.button.attrs<{ warning: boolean }, { backgroundColor: string }>(({ warning, theme }) => ({
  backgroundColor: warning ? theme.red1 : theme.primary1,
}))`
  padding: 1rem 2rem 1rem 2rem;
  border-radius: 3rem;
  cursor: pointer;
  user-select: none;
  font-size: 1rem;
  border: none;
  outline: none;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ theme }) => theme.white};
  width: 100%;

  :hover,
  :focus {
    background-color: ${({ backgroundColor }) => darken(0.05, backgroundColor)};
  }

  :active {
    background-color: ${({ backgroundColor }) => darken(0.1, backgroundColor)};
  }

  :disabled {
    background-color: ${({ theme }) => theme.bg1};
    color: ${({ theme }) => theme.text4};
    cursor: auto;
  }
`

export const CloseIcon = styled(X)<{ onClick: () => void }>`
  cursor: pointer;
`

// for wrapper react feather icons
export const IconWrapper = styled.div<{ stroke?: string; size?: string; marginRight?: string; marginLeft?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => size ?? '20px'};
  height: ${({ size }) => size ?? '20px'};
  margin-right: ${({ marginRight }) => marginRight ?? 0};
  margin-left: ${({ marginLeft }) => marginLeft ?? 0};
  & > * {
    stroke: ${({ theme, stroke }) => stroke ?? theme.blue1};
  }
`

// A button that triggers some onClick result, but looks like a link.
export const LinkStyledButton = styled.button<{ disabled?: boolean }>`
  border: none;
  text-decoration: none;
  background: none;

  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  color: ${({ theme, disabled }) => (disabled ? theme.text2 : theme.text2)};
  font-weight: 500;

  :hover {
    text-decoration: ${({ disabled }) => (disabled ? null : 'underline')};
  }

  :focus {
    outline: none;
    text-decoration: ${({ disabled }) => (disabled ? null : 'underline')};
  }

  :active {
    text-decoration: none;
  }
`

// An internal link from the react-router-dom library that is correctly styled
export const StyledInternalLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme }) => theme.text2};
  font-weight: 600;

  :hover {
    text-decoration: underline;
  }

  :focus {
    outline: none;
    text-decoration: underline;
  }

  :active {
    text-decoration: none;
  }
`
export const DiscreteInternalLink = styled(StyledInternalLink)`
  :hover {
    text-decoration: none;
  }

  :focus {
    outline: none;
    text-decoration: none;
  }
`
const StyledLink = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme }) => theme.text2};
  font-weight: 500;

  :hover {
    text-decoration: underline;
  }

  :focus {
    outline: none;
    text-decoration: underline;
  }

  :active {
    text-decoration: none;
  }
`

const LinkIconWrapper = styled.a`
  text-decoration: none;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  display: flex;

  :hover {
    text-decoration: none;
    opacity: 0.7;
  }

  :focus {
    outline: none;
    text-decoration: none;
  }

  :active {
    text-decoration: none;
  }
`

export const LinkIcon = styled(LinkIconFeather)`
  height: 16px;
  width: 18px;
  margin-left: 10px;
  stroke: ${({ theme }) => theme.blue1};
`

export const TrashIcon = styled(Trash)`
  height: 16px;
  width: 18px;
  margin-left: 10px;
  stroke: ${({ theme }) => theme.text3};

  cursor: pointer;
  align-items: center;
  justify-content: center;
  display: flex;

  :hover {
    opacity: 0.7;
  }
`
const ETHERSCAN_HOSTNAMES: { [hostname: string]: true } = {
  'etherscan.io': true,
  'ropsten.etherscan.io': true,
  'rinkeby.etherscan.io': true,
  'kovan.etherscan.io': true,
  'goerli.etherscan.io': true,
  'mumbai.polygonscan.com': true,
  'polygonscan.com': true,
}

/**
 * Returns the anonymized version of the given href, i.e. one that does not leak user information
 * @param href the anonymized version of the given href
 */
function anonymizeLink(href: string): string {
  try {
    const url = new URL(href)
    if (ETHERSCAN_HOSTNAMES[url.hostname]) {
      return `${url.hostname}/${url.pathname.split('/')[1]}/***`
    }
    return href
  } catch (error) {
    console.error('Failed to anonymize outbound link', error)
    return href
  }
}

function handleClickExternalLink(event: React.MouseEvent<HTMLAnchorElement>) {
  const { target, href } = event.currentTarget

  const anonymizedHref = anonymizeLink(href)

  // don't prevent default, don't redirect if it's a new tab
  if (target === '_blank' || event.ctrlKey || event.metaKey) {
    ReactGA.outboundLink({ label: anonymizedHref }, () => {
      // must have 2-3 params
    })
  } else {
    event.preventDefault()
    // send a ReactGA event and then trigger a location change
    ReactGA.outboundLink({ label: anonymizedHref }, () => {
      window.location.href = anonymizedHref
    })
  }
}

/**
 * Outbound link that handles firing google analytics events
 */
export function ExternalLink({
  target = '_blank',
  href,
  rel = 'noopener noreferrer',
  ...rest
}: Omit<HTMLProps<HTMLAnchorElement>, 'as' | 'ref' | 'onClick'> & { href: string }) {
  return <StyledLink target={target} rel={rel} href={href} onClick={handleClickExternalLink} {...rest} />
}

export function ExternalLinkIcon({
  target = '_blank',
  href,
  rel = 'noopener noreferrer',
  ...rest
}: Omit<HTMLProps<HTMLAnchorElement>, 'as' | 'ref' | 'onClick'> & { href: string }) {
  return (
    <LinkIconWrapper target={target} rel={rel} href={href} onClick={handleClickExternalLink} {...rest}>
      <LinkIcon />
    </LinkIconWrapper>
  )
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const Spinner = styled.img`
  animation: 2s ${rotate} linear infinite;
  width: 16px;
  height: 16px;
`

const BackArrowLink = styled(StyledInternalLink)`
  color: ${({ theme }) => theme.text1};
`
export function BackArrow({ to }: { to: string }) {
  return (
    <BackArrowLink to={to}>
      <ArrowLeft />
    </BackArrowLink>
  )
}

export const CustomLightSpinner = styled(Spinner)<{ size: string }>`
  height: ${({ size }) => size};
  width: ${({ size }) => size};
`

export const HideSmall = styled.span`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;
  `};
`

export const HideExtraSmall = styled.span`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`

export const SmallOnly = styled.span`
  display: none;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: block;
  `};
`

export const ExtraSmallOnly = styled.span`
  display: none;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: block;
  `};
`
export const SemiTransparent = styled.div`
  opacity: 0.5;
`
export const StyledPageHeader = styled.div`
  padding: 0;
  width: 100%;
  margin-bottom: 22px;
  font-weight: 600;
  font-size: 22px;
  color: ${({ theme }) => theme.text1};
  @media (max-width: 500px) {
    margin-bottom: 5px;
  }
`
export const ModalBlurWrapper = styled.span<{ touchable?: boolean }>`
  background: ${({ theme }) => theme.bgG5};
  border-radius: 45px;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  display: flex;
  min-width: 622px;
  z-index: 5;
  padding: 34px;
  backdrop-filter: blur(20px);
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 0;
    min-width: 100%;
  `};
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    min-width: 100%;
    max-width: 100%;
    border-radius: 0;
  `};
  user-select: ${({ touchable }) => (touchable ? 'auto' : 'none')};
`
export const StyledNumberInput = styled.input<{ error?: boolean; fontSize?: string; align?: string }>`
  color: ${({ error, theme }) => (error ? theme.red1 : theme.text1)};
  width: 0;
  position: relative;
  outline: none;
  border: none;
  flex: 1 1 auto;
  font-weight: 600;
  background-color: ${({ theme }) => theme.config.background?.secondary || theme.bg7};
  text-align: ${({ align }) => align && align};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0px;
  -webkit-appearance: textfield;
  text-align: left;
  font-size: 22px;
  line-height: 40px;
  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  [type='number'] {
    -moz-appearance: textfield;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ::placeholder {
    color: ${({ theme }) => theme.text2};
    opacity: 0.5;
    font-style: normal;
  }
`
export const SvgIconWrapper = styled.div<{ size?: number }>`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  & > img,
  span {
    height: ${({ size }) => (size ? size + 'px' : '32px')};
    width: ${({ size }) => (size ? size + 'px' : '32px')};
  }
`
export const gradientBorder = css`
  :before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 45px;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    padding: 2px;
    background: ${({ theme }) => `-webkit${theme.borderG1}`};
    background: ${({ theme }) => theme.borderG1};
  }
`
export const DesktopOnly = styled.span`
  ${({ theme }) => theme.mediaWidth.upToMedium`
    display: none;
  `};
`
export const DesktopAndTablet = styled.span`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;
  `};
`

export const MobileAndTablet = styled.span`
  display: none;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    display: block;
  `};
`
export const MobileOnly = styled.span`
  display: none;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: block;
  `};
`

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`
const StyledCheckbox = styled.div<{ checked: boolean }>`
  display: flex;
  width: 20px;
  height: 20px;
  background: ${({ checked, theme }) => (checked ? theme.bg12 : theme.bgG11)};
  border-radius: 100%;
  transition: all 150ms;
  justify-content: center;
  ${SvgIconWrapper} {
    visibility: ${({ checked }) => (checked ? 'visible' : 'hidden')};
  }
`
const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`

export const Checkbox = ({ className, checked, ...rest }: { className?: string; checked: boolean }) => (
  <CheckboxContainer className={className}>
    <HiddenCheckbox checked={checked} {...rest} />
    <StyledCheckbox checked={checked}>
      <SvgIconWrapper size={20}>
        <Check />
      </SvgIconWrapper>
    </StyledCheckbox>
  </CheckboxContainer>
)

export const TextGradient = styled.div`
  background: ${({ theme }) => theme.bgG3};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`
export const ConnectToAppropriateNetwork = () => (
  <ColumnCenter style={{ height: '100vh', justifyContent: 'center', padding: '20px' }}>
    <TYPE.main0>
      <Trans>
        Please connect to one of the following networks: Main Ethereum, Kovan, Polygon Mainnet, Polygon Mumbai.
      </Trans>
    </TYPE.main0>
  </ColumnCenter>
)

export const ModalContentWrapper = styled(Column)`
  width: 100%;
  flex: 1 1;
  position: relative;
  background: ${({ theme }) => theme.bgG4};
`
export const ModalPadding = styled.div`
  padding: 37px 40px 19px 40px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
   padding: 22px 8px 18px 8px;
  `};
`
export const ellipsisText = css`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const EllipsisText = styled.div`
  ${ellipsisText}
`
