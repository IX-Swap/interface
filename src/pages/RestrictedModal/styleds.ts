import styled, { css } from 'styled-components'


export const FormCard = styled.div<{ filled?: boolean }>`
  background: ${({ theme }) => theme.bg18};
  border: ${({ filled, theme }) => `1px solid ${filled ? theme.success : 'transparent'}`};
  padding: 24px 24px 32px 24px;
  border-radius: 16px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 16px;
  `};
`

