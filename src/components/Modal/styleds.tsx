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
        padding-top: 106px;
        ${({ theme }) => theme.mediaWidth.upToMedium`
          padding-top: 0;
        `}
      `}

    ${({ theme }) => theme.mediaWidth.upToSmall`
          background: radial-gradient(93.65% 93.65% at 58.57% 22.42%, 
                                      rgba(206, 20, 132, 0.33) 0%,
                                      rgba(26, 18, 58, 0) 100%),
                                      rgba(44, 37, 74, 0.3);
          backdrop-filter: blur(20px);
      `}
  }
`
export const AnimatedDialogContent = animated(DialogContent)
