import { Box } from 'rebass'
import styled from 'styled-components'
import { TYPE } from 'theme'

export const PageTitle = styled(TYPE.title4)`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    font-size: 24px !important;
    line-height: 120% !important;
    text-align: left;
  `};
`

export const FormCard = styled(Box)`
  background: ${({ theme }) => theme.bg18};
  border-radius: 16px;
  padding: 32px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 24px;
`};
`
