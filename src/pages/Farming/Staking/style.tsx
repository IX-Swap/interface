import { ButtonIXSGradient } from 'components/Button'
import Column from 'components/Column'
import { ModalBottomWrapper } from 'components/earn/styled'
import { RowBetween } from 'components/Row'
import { BodyRow, HeaderRow } from 'components/Table'
import styled from 'styled-components'
import { gradientBorder } from 'theme'

export const CardsRow = styled(RowBetween)`
  ${({ theme }) => theme.mediaWidth.upToLarge`
     display:grid;
     grid-gap:15px;
     grid-template-columns: 50% 50%;
      > div:nth-child(1) {
       justify-self: flex-end;
      }
      > div:nth-child(2){
        justify-self: flex-start;
      }
      > div:nth-child(3){
        justify-self: flex-end;
      }
      > div:nth-child(4){
        justify-self: flex-start;
      }
  `};
  ${({ theme }) => theme.mediaWidth.upToSmall`
        grid-template-columns: 100%;
        > div {
          justify-self: center !important;
         }
     `};
`

export const StakingWrapper = styled.div`
  display: flex;
  padding-top: 42px;
  gap: 90px;
  padding-left: 15px;
  padding-right: 15px;
  flex-wrap: wrap;
  justify-content: center;
  ${({ theme }) => theme.mediaWidth.upToMedium`
     flex-direction: column;
     align-items: center;
  `};
`
export const StakingCard = styled.div`
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 30px;
  display: flex;
  background: ${({ theme }) => theme.bgG15};
  flex-direction: column;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    border-radius: 20px; 
  `};
`
export const PromoTokenCardWrapper = styled(StakingCard)`
  justify-content: center;
  align-items: center;
  text-align: left;
  padding: 35px 52px;
  width: auto;
  max-width: 674px;
  line-height: 24px;

  #ixs-token-icon-col {
    margin-right: 60px;
    margin-bottom: auto;
    margin-top: 5px;
  }

  #main-info-col {
    max-width: 418px;
  }

  ${({ theme }) => theme.mediaWidth.upToSmall`
    // flex-direction: column;
    padding: 20px 30px;

    #promo-staking-wrapper {
      flex-direction: column;
    }

    #ixs-token-icon-col {
      margin-right: 0px;
      margin-bottom: 30px;
    }
  `};
`
export const GetIXSStakingCard = styled(PromoTokenCardWrapper)`
  padding: 35px 34px 37px 34px;
`
export const StackingPositionCard = styled(StakingCard)`
  padding: 32px;
  height: 458px;
  min-width: 370px;
  max-width: 415px;
  justify-content: space-between;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      align-self: flex-start;
      min-width: 330px;
      max-width: 330px;
      height: auto;
  `};
`
export const TokenStakingDescriptionNumbers = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  flex-wrap: wrap;
  gap: 20px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
     flex-direction: column;
     gap: 15px;
  `};
`
export const NoIXSTokensWrapper = styled.div`
  position: relative;
  padding: 6% 15%;
  ${gradientBorder}
  text-align: center;
  margin-bottom: 10px;
  margin-top: 27px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 15%;
  `};
  :before {
    ${({ theme }) => theme.mediaWidth.upToSmall`
      border-radius:25px;
     `};
  }
  * a {
    ${({ theme }) => theme.mediaWidth.upToSmall`
    font-size:15px;
  `};
  }
`

export const ButtonRow = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 34px;
  justify-content: center;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      flex-direction: column;
      align-items: center;
      justify-content: center;
  `};
`

export const StakingTierCardWrapper = styled(StakingCard)`
  padding: 24px;
  padding-bottom: 0px;
  height: 466px;
  width: 294px;

  &.fully-staked {
    background: radial-gradient(
        79.76% 116.06% at 44.22% 136.36%,
        rgba(102, 20, 206, 0.132) 0%,
        rgba(26, 18, 58, 0) 100%
      ),
      rgba(44, 37, 74, 0.3);
    opacity: 0.5;

    button {
      opacity: 1;
    }
  }
`

export const MutedText = styled.span`
  color: ${({ theme: { text2 } }) => text2};
  opacity: 0.5;
  padding-left: 0.5em;
`

export const LockedTillColumn = styled(Column)`
  color: ${({ theme: { text2 } }) => text2};
  opacity: 0.5;
  font-size: 12px;
  line-height: 18px;

  .lock-icon {
    margin-right: 0.5em;
    margin-bottom: 4px;
  }
`

export const NoData = styled.div`
  margin-top: 39px;
  font-weight: 400;
  color: ${({ theme: { text2 } }) => text2};
  text-align: center;
  background-color: #2c254a80;
  border-radius: 30px;
  padding: 36px;
`

export const Tier = styled.div`
  background: ${({ theme: { bgG3 } }) => bgG3};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  display: flex;
  align-items: flex-end !important;

  .digit {
    font-size: 32px;
    font-weight: 700;
    line-height: 37px;
  }
`

export const Container = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-gap: 50px;
`

export const StyledHeaderRow = styled(HeaderRow)`
  grid-template-columns: 160px 100px 190px 160px 160px 180px auto;
  min-width: 1270px;

  .header-label {
    color: ${({ theme: { text2 } }) => text2};
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
    opacity: 0.5;
  }
`

export const StyledBodyRow = styled(BodyRow)`
  grid-template-columns: 160px 100px 190px 160px 160px 180px 180px auto;
  min-width: 1270px;
  font-size: 14px;
  line-height: 21px;
  font-weight: 400;

  .rewards {
    color: #9df9b1;
  }
`

export const RewardsBodyRow = styled(StyledBodyRow)`
  grid-template-columns: 190px 190px 180px 180px 180px 180px auto;
`
export const RewardsHeaderRow = styled(StyledHeaderRow)`
  grid-template-columns: 190px 190px 180px 180px 180px 180px auto;
`
export const StakeInfoContainer = styled(Column)`
  background-color: ${({ theme }) => theme.bg8};
  padding: 25px 23px;
  border-radius: 20px;
  grid-gap: 8px;
  > div {
    display: grid;
    grid-gap: 15px;
    grid-template-columns: auto 1fr;
    height: auto;
    > :first-child {
      min-width: fit-content;
      font-size: 14px;
      color: ${({ theme }) => theme.text2};
    }
    > :last-child {
      width: 100%;
      > div {
        color: white;
        font-size: 16px;
        width: 100%;
        text-align: right;
      }
    }
    @media (max-width: 540px) {
      grid-template-columns: 1fr;
      grid-gap: 0;
      > :last-child {
        > div {
          text-align: left;
        }
      }
    }
  }
`

export const EllipsedText = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  > div {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
  }
`

export const ModalBottom = styled(ModalBottomWrapper)`
  @media (max-width: 768px) {
    padding: 15px;
  }

  .text-row {
    font-size: 16px !important;
  }
`
export const UnstakeButton = styled(ButtonIXSGradient)`
  align-self: center;
  padding: 16px 26px;
`
export const ClaimButton = styled(UnstakeButton)``

export const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
