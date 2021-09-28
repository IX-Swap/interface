import React from 'react'
import styled, { css } from 'styled-components'
import { useTransition, useSpring } from 'react-spring'
import { isMobile } from 'react-device-detect'
import { transparentize } from 'polished'
import { useGesture } from 'react-use-gesture'
import { ModalProps } from './interfaces'
import { AnimatedDialogContent, StyledDialogOverlay } from './styleds'

// destructure to not pass custom props to Dialog DOM element
const StyledDialogContent = styled(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ minHeight, maxHeight, mobile, isOpen, isright, mobileMaxHeight, scrollable, tip, ...rest }) => (
    <AnimatedDialogContent {...rest} />
  )
).attrs({
  'aria-label': 'dialog',
})`
  overflow-y: ${({ mobile }) => (mobile ? 'scroll' : 'hidden')};

  ${({ tip }) =>
    tip &&
    css`
      ::before {
        content: '${tip}';
        position: fixed;
        background: radial-gradient(93.65% 93.65% at 58.57% 22.42%, rgb(125 0 76 / 17%) 0%, rgb(32 11 39 / 88%) 100%),
          #2c254ae6;
        border-radius: 45px;
        padding: 30px;
        z-index: 10;
        color: ${({ theme }) => theme.text2};
        font-weight: 300;
        font-size: 12px;
        line-height: 18px;
        width: 520px;
        top: 2.5%;
        position: absolute;
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        ${({ theme }) => theme.mediaWidth.upToSmall`
          width: 74vw;
          top: 0;
          position: relative;
        `}
        ${({ theme }) => theme.mediaWidth.upToMedium`
          margin-bottom: 6px;
        `}
      }

      &[data-reach-dialog-content] {
        ${({ theme }) => theme.mediaWidth.upToSmall`
            flex-direction: column;
          `}
      }
    `}

  &[data-reach-dialog-content] {
    margin: ${({ isright }) => (isright ? '4rem 0 2rem 0' : '0 0 2rem 0')};
    background-color: ${({ theme }) => theme.bg0};
    box-shadow: 0 4px 8px 0 ${({ theme }) => transparentize(0.95, theme.shadow1)};
    padding: 0px;
    width: 622px;
    max-width: fit-content;
    overflow-y: ${({ mobile }) => (mobile ? 'auto' : 'hidden')};
    overflow-x: hidden;
    align-self: ${({ isright }) => (isright ? 'flex-start' : 'center')};
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
    ${({ scrollable }) =>
      scrollable &&
      css`
        overflow-y: visible;
        max-height: none;
        align-self: flex-start;
        margin: 16px !important;
      `}
    ${({ minHeight }) =>
      minHeight &&
      css`
        min-height: ${minHeight}vh;
      `}
    display: flex;
    border-radius: 45px;
    ${({ theme, scrollable }) => theme.mediaWidth.upToMedium`
      width: 100vw;
      ${scrollable && 'min-height: auto !important;'}
      background: rgba(26, 18, 58, 0);
      backdrop-filter: opacity(0);
    `}
    ${({ theme, mobileMaxHeight }) => theme.mediaWidth.upToSmall`
          border-radius: 20px;
          top: 0;
          max-width: 90vw;
          min-height: 95vh;
          margin:0;
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
  isright = false,
  scrollable = false,
  tip,
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
              isright={isright}
              scrollable={scrollable}
              tip={tip}
            >
              <StyledDialogContent
                {...(isMobile
                  ? {
                      ...bind(),
                      style: { transform: y?.interpolate((y) => `translateY(${(y as number) > 0 ? y : 0}px)`) },
                    }
                  : {})}
                aria-label="dialog content"
                minHeight={minHeight}
                maxHeight={maxHeight}
                mobile={isMobile}
                isright={isright}
                mobileMaxHeight={mobileMaxHeight}
                scrollable={scrollable}
                tip={tip}
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
