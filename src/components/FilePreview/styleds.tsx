import { Flex } from 'rebass'
import styled, { css } from 'styled-components'

import { ReactComponent as PdfImage } from 'assets/images/pdf.svg'

export const Wrapper = styled(Flex)<{ withBackground: boolean }>`
  padding: 10px 12px;
  border-radius: 6px;
  // min-width: 100%;
  border: 1px solid #e6e6ff;
  // background-color: ${({ theme, withBackground }) => (withBackground ? theme.bg1 : 'none')};
  width: 100%;
  position: relative;
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

export const PayoutPreviewImageWrapper = styled(Flex)<{ withBackground: boolean }>`
  padding: 0px 12px;
  border-radius: 6px;
  border: 1px solid #e6e6ff;
  background-color: #f7f7fa;
  position: relative;
`
