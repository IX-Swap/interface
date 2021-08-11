import { ToggleOption, ToggleWrapper } from 'components/Tabs'
import { Box } from 'rebass'
import styled from 'styled-components'
import { hexToRGBA } from 'utils/themeHelper'

export const Container = styled(Box)`
  height: fit-content;
`

export const FarmingToggleWrapper = styled(ToggleWrapper)`
  grid-gap: 46px;
`

export const FarmingToggleOption = styled(ToggleOption)`
  text-transform: unset;
  color: ${({ theme, active }) => (active ? theme.text1 : hexToRGBA(theme.text2, 0.7))};
  font-size: 36px;
  line-height: 56px;
  :hover {
    color: ${({ theme }) => theme.text2};
  }
`
export const VestingWrapper = styled.div`
  display: flex;
  padding-top: 50px;
  gap: 33px;
  flex-wrap: wrap;
  justify-content: center;
  ${({ theme }) => theme.mediaWidth.upToMedium`
     flex-direction: column;
     align-items: center
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
  width: 873px;
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
  width: 360px;
  gap: 15px;
  height: 475px;
  align-items: center;
  ${({ theme }) => theme.mediaWidth.upToMedium`
     min-width: fit-content;
  `};
`
export const VestingTextWrapper = styled(Box)`
  height: 100%;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  width: 180px;
  align-self: center;
`
export const VestingTableTitle = styled.div`
  opacity: 0.5;
  text-align: left;
`
export const ChartParent = styled.div`
  height: 320px;
  width: 100%;
`
export const VestingContractDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
