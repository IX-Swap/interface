import React from 'react'
import styled, { css } from 'styled-components'
import { useTransition, useSpring } from 'react-spring'
import { isMobile } from 'react-device-detect'
import { transparentize } from 'polished'
import { useGesture } from 'react-use-gesture'
import { ModalProps } from './interfaces'
import { AnimatedDialogContent, StyledDialogOverlay } from './styleds'

// destructure to not pass custom props to Dialog DOM element
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledDialogContent = styled(({ minHeight, maxHeight, mobile, isOpen, isRight, mobileMaxHeight, ...rest }) => (
  <AnimatedDialogContent {...rest} />
)).attrs({
  'aria-label': 'dialog',
})`
  overflow-y: ${({ mobile }) => (mobile ? 'scroll' : 'hidden')};

  &[data-reach-dialog-content] {
    margin: ${({ isRight }) => (isRight ? '4rem 0 2rem 0' : '0 0 2rem 0')};
    background-color: ${({ theme }) => theme.bg0};
    box-shadow: 0 4px 8px 0 ${({ theme }) => transparentize(0.95, theme.shadow1)};
    padding: 0px;
    width: 622px;
    max-width: fit-content;
    overflow-y: ${({ mobile }) => (mobile ? 'scroll' : 'hidden')};
    overflow-x: hidden;
    align-self: ${({ mobile, isRight }) => (mobile ? 'flex-end' : isRight ? 'flex-start' : 'center')};
    ${({ maxHeight }) =>
      maxHeight &&
      css`
        max-height: ${!isNaN(maxHeight) ? `${maxHeight}vh` : maxHeight};
      `}
    ${({ maxHeight }) =>
      !maxHeight &&
      css`
        height: 785px;
      `}
    ${({ minHeight }) =>
      minHeight &&
      css`
        min-height: ${minHeight}vh;
      `}
    display: flex;
    border-radius: 45px;
    ${({ theme }) => theme.mediaWidth.upToMedium`
      width: 100vw;

    `}
    ${({ theme, mobileMaxHeight }) => theme.mediaWidth.upToSmall`
          border-radius: 0px;
          top: 0;
         ${
           mobileMaxHeight &&
           css`
             max-height: ${mobileMaxHeight}vh;
           `
         }}
    `}
  }
`
export default function RedesignedWideModal({
  isOpen,
  onDismiss,
  minHeight = false,
  maxHeight = 90,
  mobileMaxHeight = false,
  initialFocusRef,
  children,
  isRight = false,
}: ModalProps) {
  const fadeTransition = useTransition(isOpen, null, {
    config: { duration: 200 },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  const [{ y }, set] = useSpring(() => ({ y: 0, config: { mass: 1, tension: 210, friction: 20 } }))
  const bind = useGesture({
    onDrag: (state) => {
      set({
        y: state.down ? state.movement[1] : 0,
      })
      if (state.movement[1] > 300 || (state.velocity > 3 && state.direction[1] > 0)) {
        onDismiss()
      }
    },
  })

  return (
    <>
      {fadeTransition.map(
        ({ item, key, props }) =>
          item && (
            <StyledDialogOverlay
              key={key}
              style={props}
              onDismiss={onDismiss}
              initialFocusRef={initialFocusRef}
              unstable_lockFocusAcrossFrames={false}
              isRight={isRight}
            >
              <StyledDialogContent
                {...(isMobile
                  ? {
                      ...bind(),
                      style: { transform: y.interpolate((y) => `translateY(${(y as number) > 0 ? y : 0}px)`) },
                    }
                  : {})}
                aria-label="dialog content"
                minHeight={minHeight}
                maxHeight={maxHeight}
                mobile={isMobile}
                isRight={isRight}
                mobileMaxHeight={mobileMaxHeight}
              >
                {/* prevents the automatic focusing of inputs on mobile by the reach dialog */}
                {!initialFocusRef && isMobile ? <div tabIndex={1} /> : null}
                {children}
              </StyledDialogContent>
            </StyledDialogOverlay>
          )
      )}
    </>
  )
}
