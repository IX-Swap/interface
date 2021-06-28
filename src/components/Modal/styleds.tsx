import styled from 'styled-components'
import { animated } from 'react-spring'
import { DialogOverlay, DialogContent } from '@reach/dialog'

export const AnimatedDialogOverlay = animated(DialogOverlay)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const StyledDialogOverlay = styled(AnimatedDialogOverlay)`
  &[data-reach-dialog-overlay] {
    z-index: 2;
    background-color: transparent;
    overflow: hidden;
    overflow-y: hidden;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: ${({ theme }) => theme.modalBG};
  }
`

export const AnimatedDialogContent = animated(DialogContent)
