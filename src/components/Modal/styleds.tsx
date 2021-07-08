import styled from 'styled-components'
import { animated } from 'react-spring'
import { DialogOverlay, DialogContent } from '@reach/dialog'

export const AnimatedDialogOverlay = animated(DialogOverlay)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const StyledDialogOverlay = styled(AnimatedDialogOverlay)<{ isRight?: boolean }>`
  &[data-reach-dialog-overlay] {
    z-index: 2;
    background-color: transparent;
    overflow: hidden;
    overflow-y: hidden;

    display: flex;
    align-items: ${({ isRight }) => (isRight ? 'flex-start' : 'center')};
    justify-content: ${({ isRight }) => (isRight ? 'flex-end' : 'center')};

    background-color: ${({ theme }) => theme.modalBG};
  }
`
export const AnimatedDialogContent = animated(DialogContent)
