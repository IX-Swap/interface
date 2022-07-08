import styled from 'styled-components'

import { ButtonEmpty, ButtonGradient } from 'components/Button'
import { isNotSupportGradient } from 'components/Button'
import { RowStart } from 'components/Row'
import { TYPE, MEDIA_WIDTHS, gradientBorder } from 'theme'
import CurrencyLogo from 'components/CurrencyLogo'
import { BodyWrapper } from 'pages/AppBody'

export const Container = styled(BodyWrapper)`
  background: ${({ theme }) => theme.bg1};
  height: fit-content;
  width: 100%;
  max-width: 920px;
`
export const InfoTitle = styled(RowStart)`
  gap: 21px;
  margin-bottom: 41px;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    gap: 12px;
  `}
`

export const TitleText = styled.span`
  font-weight: 600;
  font-size: 36px;
  line-height: 56px;
  color: ${({ theme }) => theme.text1};
`
export const DescriptionTitle = styled(TYPE.titleSmall)`
  text-transform: uppercase;
`
export const Description = styled.span``

export const Details = styled.div`
  margin-top: 34px;
  display: grid;
  row-gap: 16px;
  > :first-child {
    flex-wrap: wrap;
    display: flex;
    column-gap: 12px;
    row-gap: 12px;
    align-items: center;
    font-size: 18px;
    * {
      color: ${({ theme }) => theme.text1};
    }

    ${({ theme }) => theme.mediaWidth.upToMedium`
      flex-direction: column;
      align-items: start;
    `}
  }

  > :last-child {
    color: ${({ theme }) => theme.text2};
  }
`

export const Dot = styled.div`
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.white};

  ${({ theme }) => theme.mediaWidth.upToMedium`
    display: none;
  `}
`

export const GridElement = styled.div`
  width: fit-content;
`
export const ReadMoreButton = styled(ButtonEmpty)`
  display: inline-block;
  width: fit-content;
  height: fit-content;
  padding: 0;
  margin: 0;
  color: ${({ theme }) => theme.text1};
  :hover {
    text-decoration: underline;
  }
`
export const DescriptionText = styled(TYPE.descriptionThin)`
  display: inline;
  color: ${({ theme }) => theme.text2};
`
export const IconWrapper = styled.div<{ size?: number }>`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  & > * {
    height: ${({ size }) => (size ? size + 'px' : '32px')};
    width: ${({ size }) => (size ? size + 'px' : '32px')};
  }
`
export const Logo = styled(CurrencyLogo)`
  ${({ theme }) => theme.mediaWidth.upToMedium`
    width: 36px;
    height: 36px;
  `}
`

export const StyledTitleBig = styled(TYPE.titleBig)`
  ${({ theme }) => theme.mediaWidth.upToMedium`
    font-size: 24px !important;
    line-height: 32px !important;
    min-width: auto !important;
  `}
`

export const CompanyName = styled(StyledTitleBig)`
  ${({ theme }) => theme.mediaWidth.upToMedium`   
    font-size: 20px !important;
    line-height: 24px !important;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  `}
`

export const AddressToMetamask = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  margin-top: 32px;
  row-gap: 12px;
  > :first-child {
    display: flex;
    align-items: center;
    margin-right: 18px;
    font-weight: 500;
    svg {
      margin-right: 12px;
      cursor: pointer;
    }
    ${({ theme }) =>
      !isNotSupportGradient
        ? `
        background: ${theme.config.elements?.hover || theme.bgG3};
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      `
        : `
        color: ${theme.bg20};
      `}
  }
  > div:nth-child(2) {
    margin-right: 12px;
  }
  flex-wrap: wrap;
`

export const StyledButtonGradient = styled(ButtonGradient)`
  height: 24px;
  width: auto;
  padding: 4px 16px;
  font-weight: 600;
  font-size: 14px;
`
export const AtlasInfoContainer = styled.div`
  margin-top: 48px;
  display: grid;
  grid-template-columns: repeat(3, auto);
  row-gap: 8px;
  column-gap: 8px;
  * {
    font-weight: 500;
    font-size: 18px;
    opacity: 0.5;
    color: ${({ theme }) => theme.text1};
  }
  span {
    margin-left: 12px;
    color: ${({ theme }) => theme.text2};
  }
  @media (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    grid-template-columns: 1fr;
  }
`

export const ValutContainer = styled.div`
  margin-top: 48px;
`
export const NotTradableContainer = styled.div`
  background: ${({ theme }) => theme.bgG10};
  border-radius: 45px;
  padding: 3rem 12px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${gradientBorder}
  > :first-child {
    line-height: 28px;
    margin-bottom: 20px;
    text-transform: uppercase;
  }
`
