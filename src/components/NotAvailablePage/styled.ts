import styled from 'styled-components'

import { gradientBorder, MEDIA_WIDTHS } from 'theme'

export const Container = styled.div`
  max-width: 592px;
  width: 100%;
  border-radius: 30px;
  background: radial-gradient(39.01% 78.49% at 10.99% 63.28%, rgba(138, 54, 152, 0.18) 18.75%, rgba(0, 0, 0, 0) 100%),
    radial-gradient(93.65% 93.65% at 58.57% 22.42%, rgba(154, 55, 114, 0.33) 0%, rgba(26, 18, 58, 0) 100%) #29113d;
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
  background: linear-gradient(116.36deg, #7b42a9 33.43%, #ed0376 95.41%);
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
  color: #ffffff;
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
  color: #ffffff;
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
  background: #ffffff;
  border-radius: 32px;
  padding: 2px 6px;

  > div {
    font-weight: 600;
    font-size: 10px;
    line-height: 15px;
    background: linear-gradient(116.36deg, #7b42a9 33.43%, #ed0376 95.41%);
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

export const ConnectWalletContainer = styled(Container)`
  > div {
    font-weight: 500;
    font-size: 24px;
    line-height: 160%;
    text-align: center;
    color: #ffffff;
    margin-bottom: 32px;
  }
  > button {
    max-width: 312px;
    width: 100%;
    margin: 0 auto;
  }
`
