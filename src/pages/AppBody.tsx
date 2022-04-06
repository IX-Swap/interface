import React from 'react'
import { useCookies } from 'react-cookie'
import styled from 'styled-components/macro'

import { NotAvailablePage } from 'components/NotAvailablePage'

export const BodyWrapper = styled.div<{
  margin?: string
  padding?: string
  paddingXS?: string
  maxWidth?: string
  transparent?: boolean
  blurred?: boolean
  hasAnnouncement?: boolean
}>`
  position: relative;
  margin-top: ${({ margin }) => margin ?? '0px'};
  max-width: ${({ maxWidth }) => maxWidth ?? '592px'};
  width: 100%;
  background: ${({ theme, transparent }) => (transparent ? 'transparent' : theme.bg1)};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: ${({ blurred }) => (blurred ? '30px' : '24px')};
  margin-top: ${({ hasAnnouncement }) => (hasAnnouncement ? '3rem' : '1rem')};
  padding: ${({ padding, blurred }) => (blurred ? '0px' : padding ?? '26px 36px 52px 36px;')};
  ${({ theme, paddingXS, blurred }) =>
    !blurred &&
    theme.mediaWidth.upToExtraSmall`
      padding: ${paddingXS ?? '1rem 0.7rem'};
  `};
  z-index: 1;

  ${({ theme, hasAnnouncement }) => theme.mediaWidth.upToMedium`
    margin-top: ${hasAnnouncement ? '9rem' : '1rem'};
  `};
`
export const BlurredOverlay = styled.div`
  width: 100%;
  display: flex;
  text-align: center;
  vertical-align: center;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(10px);
  background: ${({ theme }) => theme.bgG16};
  border-radius: 30px;
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({
  children,
  blurred,
  ...rest
}: {
  children: React.ReactNode
  blurred?: boolean
  transparent?: boolean
  maxWidth?: string
}) {
  const [cookies] = useCookies(['annoucementsSeen'])

  return (
    <React.Fragment>
      <BodyWrapper {...rest} hasAnnouncement={!cookies.annoucementsSeen} blurred={blurred}>
        {blurred && (
          <BlurredOverlay>
            <NotAvailablePage />
          </BlurredOverlay>
        )}
        {!blurred && children}
      </BodyWrapper>
    </React.Fragment>
  )
}
