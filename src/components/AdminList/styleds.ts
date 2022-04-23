import styled from 'styled-components'
import { Flex } from 'rebass'

import { StyledButtonGradientBorder as ButtonGradientBorder } from 'components/AdminSecurityCatalog/styleds'
import { BodyRow, HeaderRow } from 'components/Table'

export const StyledBodyRow = styled(BodyRow)`
  grid-template-columns: 1fr 1fr 1fr 1fr;
  min-width: 1270px;
`

export const StyledHeaderRow = styled(HeaderRow)`
  grid-template-columns: 1fr 1fr 1fr 1fr;
  min-width: 1270px;
`

export const StyledButtonGradientBorder = styled(ButtonGradientBorder)`
  margin-left: 33px;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    margin-top: 16px;
    margin-left: 0px;
  `};
`

export const TopContent = styled(Flex)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    flex-direction: column;
  `};
`
