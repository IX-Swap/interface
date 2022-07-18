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

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 32px;
  gap: 32px;
  > button {
    min-height: 40px;
    height: 40px;
    width: auto;
    padding: 12px 24px;
    font-size: 16px;
    font-weight: 600;
  }
`
