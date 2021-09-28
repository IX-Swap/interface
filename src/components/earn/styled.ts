import styled from 'styled-components/macro'
import Column, { AutoColumn } from '../Column'

import uImage from '../../assets/images/big_unicorn.png'
import noise from '../../assets/images/noise.png'
import { Text } from 'rebass'
import Input from 'components/NumericalInput'
import { ModalContentWrapper } from 'theme'

export const TextBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 12px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 20px;
  width: fit-content;
  justify-self: flex-end;
`

export const DataCard = styled(AutoColumn)<{ disabled?: boolean }>`
  background: radial-gradient(76.02% 75.41% at 1.84% 0%, #ff007a 0%, #2172e5 100%);
  border-radius: 12px;
  width: 100%;
  position: relative;
  overflow: hidden;
`

export const CardBGImage = styled.span<{ desaturate?: boolean }>`
  background: url(${uImage});
  width: 1000px;
  height: 600px;
  position: absolute;
  border-radius: 12px;
  opacity: 0.4;
  top: -100px;
  left: -100px;
  transform: rotate(-15deg);
  user-select: none;
  ${({ desaturate }) => desaturate && `filter: saturate(0)`}
`

export const CardNoise = styled.span`
  background: url(${noise});
  background-size: cover;
  mix-blend-mode: overlay;
  border-radius: 12px;
  width: 100%;
  height: 100%;
  opacity: 0.15;
  position: absolute;
  top: 0;
  left: 0;
  user-select: none;
`

export const CardSection = styled(AutoColumn)<{ disabled?: boolean }>`
  padding: 1rem;
  z-index: 1;
  opacity: ${({ disabled }) => disabled && '0.4'};
`

export const Break = styled.div`
  width: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  height: 1px;
`

export const EarnModalContentWrapper = styled(ModalContentWrapper)`
  border-radius: 20px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
   padding: 0px;
  `};
`
export const StakeModalTop = styled(Column)`
  padding: 37px 40px 57px 40px;
`

export const ModalBottomWrapper = styled(Column)`
  padding: 33px 40px 34px 40px;
  background: ${({ theme }) => theme.bgG7};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`

export const HighlightedInput = styled.div<{ active?: boolean; warning?: boolean }>`
  min-height: 60px;
  width: 100%;
  position: relative;
  padding: 10px 22px;
  flex: 1;
  background: ${({ theme }) => theme.bg12};
  border-radius: 36px;
  border: ${({ theme, active, warning }) =>
    warning ? `1px solid ${theme.red1}` : active ? `1px solid ${theme.popUpInputBorder}` : 'none'};
  :hover {
    box-shadow: ${({ theme, warning }) =>
      warning ? `0px 0px 2px 1px ${theme.red1}` : `0px 0px 2px 1px ${theme.popUpInputBorder}`};
  }
`
export const AvailableBalance = styled(Text)`
  color: ${({ theme }) => theme.text8};
  font-size: 14px;
  line-height: 39px;
`

export const StakingInput = styled(Input)`
  background: ${({ theme }) => theme.bg12};
  width: 60%;
  margin-right: 10px;
`
export const BottomClaimButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  align-items: center;
  ${({ theme }) => theme.mediaWidth.upToMedium`
   flex-direction: column;
   gap: 5px;
  `};
`
