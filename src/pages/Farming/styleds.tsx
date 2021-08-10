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
