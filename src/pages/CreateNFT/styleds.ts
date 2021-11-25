import { Box } from 'rebass'
import styled from 'styled-components'

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
