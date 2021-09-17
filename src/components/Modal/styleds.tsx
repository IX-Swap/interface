import styled, { css } from 'styled-components'
import { animated } from 'react-spring'
import { DialogOverlay, DialogContent } from '@reach/dialog'

export const AnimatedDialogOverlay = animated(DialogOverlay)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const StyledDialogOverlay = styled(AnimatedDialogOverlay)<{
  isright?: boolean
  scrollable?: boolean
  tip?: string
}>`
  &[data-reach-dialog-overlay] {
    z-index: 2;
    background-color: transparent;
    overflow: hidden;
    overflow-y: hidden;
    ${({ scrollable }) =>
      scrollable &&
      css`
        overflow-y: visible;
      `}

    display: flex;
    align-items: ${({ isright }) => (isright ? 'flex-start' : 'center')};
    justify-content: ${({ isright }) => (isright ? 'flex-end' : 'center')};

    background-color: ${({ theme }) => theme.modalBG};
    ${({ tip }) =>
      tip &&
      css`
        padding-top: 80px;
        ${({ theme }) => theme.mediaWidth.upToSmall`
          padding-top: 0;
        `}
      `}
  }
`
export const AnimatedDialogContent = animated(DialogContent)
