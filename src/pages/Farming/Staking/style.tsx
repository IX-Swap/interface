import styled from 'styled-components'
import { gradientBorder } from 'theme'

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
  height: 466px;
  width: 294px;
`
