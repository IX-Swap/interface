import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import _get from 'lodash/get'
import LearnMoreIcon from 'assets/launchpad/icons/learn-more.png'
import { text31, text52, text6 } from 'components/LaunchpadMisc/typography'
import { MEDIA_WIDTHS } from 'theme'
import { isMobile } from 'react-device-detect'
import { useWhitelabelState } from 'state/whitelabel/hooks'
import { ReactComponent as LPBackground } from 'assets/images/LPBackground.svg'
import { ReactComponent as LaunchpadHeader } from 'assets/images/lauchpadHeader.svg'
import apiService from 'services/apiService'
import { isLineLiff } from 'utils'

export const Banner = () => {
  const { config } = useWhitelabelState()

  const [totalRaised, setTotalRaised] = useState(0)

  const launchpadBannerTitle = config?.launchpadBannerTitle
    ? config.launchpadBannerTitle
    : 'Invest in Startups <br /> and Other Unicorn <br /> Like Opportunities'
  const launchpadBannerInfoRedirectTitle = config?.launchpadBannerInfoRedirectTitle ?? 'How does IXS Launchpad work?'
  const launchpadBannerInfoRedirectUrl = config?.launchpadBannerInfoRedirectUrl ?? 'https://www.ixswap.io/academy'
  const isIxswap = config?.isIxSwap ?? false

  const getTotalRaised = async () => {
    try {
      const { status, data } = await apiService.get('/offers/total-raised-funds')

      if (status === 200) {
        setTotalRaised(_get(data, 'totalRaisedFunds', 0))
      }
    } catch (error) {
      console.error('Error getting total raised', error)
      setTotalRaised(0)
    }
  }

  useEffect(() => {
    getTotalRaised()
  }, [])

  return (
    <BannerContainer>
      <BannerContent>
        {isMobile ? (
          <>
            <BannerTitle
              dangerouslySetInnerHTML={{ __html: launchpadBannerTitle.replaceAll('<br /> ', '') }}
            ></BannerTitle>
            <BannerTitleMobile>Next Generation Fundraising</BannerTitleMobile>
          </>
        ) : (
          <BannerTitle dangerouslySetInnerHTML={{ __html: launchpadBannerTitle }} />
        )}

        <TotalRaisedWrap>
          {isIxswap && !isLineLiff ? (
            <div>
              <TotalRaisedLabel>Total Raised</TotalRaisedLabel>
              <TotalRaisedValue>${totalRaised.toLocaleString('en-US')}</TotalRaisedValue>
            </div>
          ) : null}

          <BannerInfoRedirect>
            <BannerInfoRedirectImage src={LearnMoreIcon} />
            <BannerInfoRedirectLabel>
              <BannerInfoRedirectTitle>{launchpadBannerInfoRedirectTitle}</BannerInfoRedirectTitle>
              <BannerInfoRedirectSubtitle href={launchpadBannerInfoRedirectUrl} target="_blank">
                Learn more
              </BannerInfoRedirectSubtitle>
            </BannerInfoRedirectLabel>
          </BannerInfoRedirect>
        </TotalRaisedWrap>
      </BannerContent>
      <BannerImage>
        <LPBackgroundWrapper>
          <LPBackground />
          <LaunchpadHeaderWrapper>
            <LaunchpadHeader />
          </LaunchpadHeaderWrapper>
        </LPBackgroundWrapper>
      </BannerImage>
    </BannerContainer>
  )
}

const BannerContainer = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  margin: 0 0rem 0 -5rem;
  justify-items: right;
  width: 100%;
  height: 100vh;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    grid-template-columns: 1fr;
    margin: 2rem 1rem 0rem 1rem;
    height: auto;
  }
`

const BannerContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 8rem 1rem 0rem 0rem;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    padding: 0rem 1rem 0rem 0rem;
  }
`

const BannerTitle = styled.div`
  color: ${(props) => props.theme.launchpad.colors.text.title};
  font-family: system-ui;
  width: 530px;
  ${text52}
  margin-bottom: 2rem;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    font-size: 13px;
    color: #666680;
    font-weight: 400;
    text-align: center;
    width: auto;
  }
`

const BannerTitleMobile = styled.div`
  font-family: ${(props) => props.theme.launchpad.font};
  margin-bottom: 2rem;
  font-size: 36px;
  color: #292933;
  font-weight: 800;
  text-align: center;
`

const BannerInfoRedirect = styled.a`
  border: 1px solid ${(props) => props.theme.launchpad.colors.border.default};
  border-radius: 8px;
  padding: 6px;
  display: grid;
  grid-template-columns: 80px 1fr;
  grid-template-rows: 80px;
  gap: 1rem;
  width: 250px;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    width: 100%;
  }
`

const BannerInfoRedirectImage = styled.img`
  border-radius: 4px;
  width: 65px;
  margin-top: 7px;
  margin-left: 10px;
`

const BannerInfoRedirectLabel = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
`

const BannerInfoRedirectTitle = styled.div`
  color: ${(props) => props.theme.launchpad.colors.text.title};
  font-family: ${(props) => props.theme.launchpad.font};
  ${text31}
`

const BannerInfoRedirectSubtitle = styled.a`
  color: ${(props) => props.theme.launchpad.colors.primary};

  font-family: ${(props) => props.theme.launchpad.font};
  ${text6}
  text-decoration: none;
`

const BannerImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100vh;
  margin-left: auto;
  padding: 0;
  position: relative;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    height: auto;
  }
`

const LPBackgroundWrapper = styled.div`
  position: absolute;
  right: -40px;
  margin-top: 20px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    display: none;
  }
`

const LaunchpadHeaderWrapper = styled.div`
  position: absolute;
  top: 160px;
  right: 70px;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    display: none;
  }
`

const TotalRaisedWrap = styled.div`
  display: flex;
  gap: 42px;
  align-items: center;
  z-index: 2;

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
  }
`

const TotalRaisedLabel = styled.div`
  color: #8f8fb2;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.28px;
`

const TotalRaisedValue = styled.div`
  color: #292933;
  font-family: Inter;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: -0.96px;

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    font-size: 24px;
  }
`
