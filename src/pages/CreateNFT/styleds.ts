import { Box } from 'rebass'
import styled, { css } from 'styled-components'
import { List, Star, BarChart2 } from 'react-feather'

export const Container = styled(Box)`
  height: fit-content;
`
export const StyledTab = styled.div`
  max-width: 90vw;
  padding-left: 50px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
   padding-left: 15px;
  `};
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
   padding-left: 5px;
  `};
`

export const TraitsIcon = css`
  color: ${({ theme }) => theme.text1};
  width: 17px;
  height: 17px;
  margin-right: 20px;
`
export const StyledListIcon = styled(List)`
  ${TraitsIcon}
`
export const StyledStarIcon = styled(Star)`
  ${TraitsIcon}
`
export const StyledBarChart = styled(BarChart2)`
  ${TraitsIcon}
`
