import styled from 'styled-components/macro'
import { RowBetween } from '../Row'

export const FixedHeightRow = styled(RowBetween)`
  height: 24px;
  font-size: 16px;
  line-height: 24px;
  font-weight: normal;
  color: ${({ theme }) => theme.text2};
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
  font-size: 14px;
`};
`
