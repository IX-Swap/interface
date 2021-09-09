import { ToggleOption, ToggleWrapper } from 'components/Tabs'
import { Box } from 'rebass'
import styled from 'styled-components'
import { hexToRGBA } from 'utils/themeHelper'
import { ReactComponent as InfoSvg } from '../../assets/images/attention.svg'
import { RowStart } from 'components/Row'

export const LoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`
export const NoVestingCustomAddress = styled.div`
  text-align: center;
  font-size: 18px;
  display: flex;
  align-items: center;
  height: 100%;
`

export const YourAddressWrapper = styled.div`
  font-size: 22px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
`

export const YourAddress = styled.div`
  font-weight: 400;
`

export const Address = styled.div`
  font-weight: 700;
`

export const Container = styled(Box)`
  height: fit-content;
`

export const FarmingToggleWrapper = styled(ToggleWrapper)`
  grid-gap: 46px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
     flex-direction:row;
  `};
`

export const FarmingToggleOption = styled(ToggleOption)`
  text-transform: unset;
  color: ${({ theme, active }) => (active ? theme.text1 : hexToRGBA(theme.text2, 0.7))};
  font-size: 36px;
  line-height: 56px;
  :hover {
    color: ${({ theme }) => theme.text2};
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
    font-size: 24px;
  `};
`
export const VestingWrapper = styled.div`
  display: flex;
  gap: 33px;
  /* flex-wrap: wrap; */
  padding: 0 15px;
  @media (max-width: 1296px) {
    flex-direction: column;
    align-items: center;
  }
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
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding-left: 0px;
    padding-right: 0px;
  `};
`
export const VestingBackground = styled.div`
  border-radius: 30px;
  padding: 32px 32px 45px 32px;
  color: ${({ theme }) => theme.text2};
  background: ${({ theme }) => theme.bgG14};
  display: flex;
  flex-direction: column;
`
export const VestingTableWrapper = styled(VestingBackground)`
  max-width: 873px;
  width: 100%;
  height: fit-content;
  border-radius: 30px;
  padding: 32px 32px 45px 32px;
  color: ${({ theme }) => theme.text2};
  background: ${({ theme }) => theme.bgG14};
  gap: 50px;
`
export const VestingInfoWrapper = styled(VestingBackground)`
  padding: 31px 31px 35px 24px;
  justify-content: space-between;
  max-width: 360px;
  gap: 15px;
  height: 500px;
  width: 100%;
  align-items: center;

  ${({ theme }) => theme.mediaWidth.upToSmall`
     width:100%;
     min-width: 100%;
     height: auto;
  `};
`

export const VestingTextWrapper = styled(Box)`
  height: 100%;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  width: 252px;
  align-self: center;
  flex-direction: column;
`
export const VestingTableTitle = styled.div`
  opacity: 0.5;
  text-align: left;
`

export const VestingDetailsTitle = styled(VestingTableTitle)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  > :first-child {
    margin-right: 15px;
  }
`

export const ChartParent = styled.div`
  height: 349px;
  width: 100%;
`
export const VestingContractDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
export const StakingCard = styled.div`
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 30px;
  display: flex;
  background: ${({ theme }) => theme.bgG15};
  flex-direction: column;
`
export const StakingPromoCard = styled(StakingCard)`
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-top: 32px;
  padding-bottom: 70px;
  min-height: 330px;
  width: 294px;
`
export const GetIXSStakingCard = styled(StakingPromoCard)`
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
export const ButtonRow = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 40px;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      flex-direction: column;
      align-items: center;
      justify-content: center;
  `};
`
export const TokenDescriptionWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 330px;
  max-width: 820px;
  min-width: 50%;
  justify-content: space-between;
  ${({ theme }) => theme.mediaWidth.upToSmall`
       height: auto

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

export const InfoIcon = styled(InfoSvg)`
  transform: rotate(180deg);
  cursor: pointer;
`

export const TabsRow = styled(RowStart)`
  padding-bottom: 0px;
  width: fit-content;
  padding: 0 15px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 0px;
    width:100%;
    flex-direction:row;
  `};
`

export const UseWeb3Browser = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.text8};
  font-size: 14px;
  font-weight: 300;
  margin-top: 15px;
`
