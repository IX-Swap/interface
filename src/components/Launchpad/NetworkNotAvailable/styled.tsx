import styled from 'styled-components'

import { gradientBorder, MEDIA_WIDTHS } from 'theme'

export const Container = styled.div`
  z-index: 30;
  max-width: 592px;
  width: 100%;
  border-radius: 30px;
  background: ${({ theme }) => theme.launchpad.colors.background};
  padding: 52px 58px;
  text-align: center;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    padding: 16px;
  }
`

export const Title = styled.div`
  font-weight: 700;
  font-size: 32px;
  line-height: 145%;
  background: ${({ theme }) => theme.config.text?.main || theme.bgG1};

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  background-clip: text;
  margin-bottom: 32px;

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    font-size: 24px;
  }
`

export const Info = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: ${({ theme }) => theme.launchpad.colors.text.title};
`

export const NetworksRow = styled.div<{ elements: number }>`
  display: grid;
  gap: 34px;
  grid-template-columns: ${({ elements }) => `repeat(${elements}, minmax(auto, 105px))`};
  margin: 16px auto 40px;
  justify-content: center;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    grid-template-columns: ${({ elements }) => `repeat(${elements}, 1fr)`};
    gap: 8px;
  }
`

export const NetworkCard = styled.div`
  max-width: 134px;
  cursor: pointer;
  border-radius: 24px;
  padding: 16px;
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  text-align: center;
  color: ${({ theme }) => theme.launchpad.colors.text.title};
  position: relative;
  ${gradientBorder}
  :before {
    border-radius: 24px;
  }
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  img {
    height: 32px;
    width: auto;
  }
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    font-size: 13px;
  }
  transform: scale(1);
  transition: transform 250ms ease-in-out;
  :hover {
    transform: scale(1.05);
  }
`

export const InfoRows = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 8px;
`

export const PlaygroundBadge = styled.div`
  position: absolute;
  top: -10px;
  right: -19px;
  background: ${({ theme }) => theme.launchpad.colors.text.title};
  border-radius: 32px;
  padding: 2px 6px;

  > div {
    font-weight: 600;
    font-size: 10px;
    line-height: 15px;
    background: ${({ theme }) => theme.launchpad.colors.background};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
      font-size: 9px;
    }
  }
`

export const KovanRow = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: center;
`

export const ConnectWalletContainer = styled(Container)<{ hasAnnouncement?: boolean }>`
  margin-top: ${({ hasAnnouncement }) => (hasAnnouncement ? 3 : 1)}rem;
  a {
    color: ${({ theme }) => theme.text1};
  }
  > div:first-child {
    font-weight: 600;
    font-size: 24px;
    line-height: 160%;
    text-align: center;
    color: ${({ theme }) => theme.text1};
    margin-bottom: 4px;
  }
  > div:nth-child(2) {
    text-align: center;
    color: ${({ theme }) => theme.text1};
    margin-bottom: 32px;
  }
  > button {
    max-width: 312px;
    width: 100%;
    margin: 0 auto;
    margin-bottom: 32px;
  }
  > span:last-child {
    font-weight: 500;
    font-size: 12px;
    text-align: center;
    color: ${({ theme }) => theme.text1};
  }

  ${({ theme,  }) => theme.mediaWidth.upToMedium`
    margin-top: 1rem;
  `};
`
