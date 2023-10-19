import styled from 'styled-components'

import { ButtonEmpty, ButtonGradient } from 'components/Button'
import { isNotSupportGradient } from 'components/Button'
import { RowStart } from 'components/Row'
import { TYPE, MEDIA_WIDTHS, gradientBorder } from 'theme'
import CurrencyLogo from 'components/CurrencyLogo'
import { Box } from 'rebass'

export const Container = styled(Box)`
  height: fit-content;
  width: 100%;
  max-width: 1300px;
`
export const InfoTitle = styled(RowStart)`
  gap: 21px;
  margin-bottom: 41px;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    gap: 12px;
  `}

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    gap: 12px;
    margin-top: 130px;
      margin-bottom: 0px;
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
    color: #666680;
    fontsize: 16px;
    fontweight: 400;
    width: 680px;

       ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      flex-direction: column;
      align-items: start;
      width: auto;
      margin-top: 0px;
    `}
  }

  // > :last-child {
  //   flex-wrap: wrap;
  //   display: flex;
  //   column-gap: 12px;
  //   row-gap: 12px;
  //   align-items: center;
  //   font-size: 18px;
  //   * {
  //     color: ${({ theme }) => theme.text1};
  //   }

    ${({ theme }) => theme.mediaWidth.upToMedium`
      flex-direction: column;
      align-items: start;
    `}
  }


`

export const Value = styled.span`
  display: inline-block;
  font-size: 12px;
  color: #666680;
  margin-bottom: 5px;
  text-align: right;
  margin-left: 30px;
`

export const Label = styled.span`
  font-size: 12px;
  color: #666680 !important;
  display: inline-block;
  margin-bottom: 5px;
  text-align: left;
  width: 200px;
  // margin-right: 30px;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
  width: 160px;
  `}
`

export const Info = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px 66px;
  row-gap: 10px;
  font-size: 18px;
  * {
    color: ${({ theme }) => theme.text1};
  }

  & > div:first-child > div {
    // Your styling for the first child's div here

    & > div:last-child {
      border-bottom: 1px solid #e6e6ff;
    }
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    flex-direction: column;
    align-items: start;
    gap: 12px;
    display: flex;
  `}

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    flex-direction: column;
    align-items: start;
    gap: 12px;
    display: flex;
  `}
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
  font-size: 13px;
  margin-top: 25px;
  row-gap: 12px;
  > :first-child {
    display: flex;
    align-items: center;
    margin-right: 18px;
    padding: 12px 16px;
    font-weight: 500;
    border: 1px solid #e6e6ff;
    svg {
      margin-right: 12px;
      cursor: pointer;
      color: #b8b8cc;
    }
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

export const StyledButtonGradientAddMetamask = styled(ButtonGradient)`
  width: auto;
  padding: 12px 16px 12px 16px;
  font-weight: 500;
  font-size: 14px;
  background: none;
  color: #292933;
  border: 1px solid #e6e6ff;
  font-size: 13px;
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
  background: ${({ theme }) => theme.bg0};
  border-radius: 8px;
  padding: 120px 316px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  > :first-child {
    line-height: 28px;
    margin-bottom: 20px;
  }
`
