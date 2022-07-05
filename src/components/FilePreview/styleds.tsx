import { Flex } from 'rebass'
import styled, { css } from 'styled-components'

import { ReactComponent as PdfImage } from 'assets/images/pdf.svg'

export const Wrapper = styled(Flex)<{ withBackground: boolean }>`
  padding: 8px 12px;
  border-radius: 32px;
  background-color: ${({ theme, withBackground }) => (withBackground ? theme.bg11 : 'none')};
  max-width: ${({ withBackground }) => (withBackground ? 228 : 200)}px;
`

export const StyledPdfImage = styled(PdfImage)`
  ${({ theme }) =>
    theme.config.elements?.main &&
    css`
      path:last-child {
        fill: white;
      }
    `}
`
