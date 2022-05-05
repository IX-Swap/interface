import { CSSProperties } from '@material-ui/core/styles/withStyles'
import { Placement } from '@popperjs/core'
import Portal from '@reach/portal'
import { transparentize } from 'polished'
import React, { useCallback, useState } from 'react'
import { usePopper } from 'react-popper'
import styled from 'styled-components/macro'
import useInterval from '../../hooks/useInterval'

const PopoverContainer = styled.div<{ show: boolean }>`
  z-index: 9999;
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: visibility 150ms linear, opacity 150ms linear;
  background: ${({ theme }) => theme.bg7};
  box-shadow: 0 4px 8px 0 ${({ theme }) => transparentize(0.9, theme.shadow1)};
  color: ${({ theme }) => theme.text2};
  border-radius: 8px;
`
const ReferenceElement = styled.div`
  display: inline-block;
`

const Shadow = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
`

const Arrow = styled.div`
  width: 8px;
  height: 8px;
  z-index: 9998;

  ::before {
    position: absolute;
    width: 8px;
    height: 8px;
    z-index: 9998;

    content: '';
    transform: rotate(45deg);
    background: ${({ theme }) => theme.bg7};
  }

  &.arrow-top {
    bottom: -5px;
    ::before {
      border-top: none;
      border-left: none;
    }
  }

  &.arrow-bottom {
    top: -5px;
    ::before {
      border-bottom: none;
      border-right: none;
    }
  }

  &.arrow-left {
    right: -5px;

    ::before {
      border-bottom: none;
      border-left: none;
    }
  }

  &.arrow-right {
    left: -5px;
    ::before {
      border-right: none;
      border-top: none;
    }
  }
`

export interface PopoverProps {
  content: React.ReactNode
  show: boolean
  children: React.ReactNode
  placement?: Placement
  style?: any
  referenceStyle?: CSSProperties
  offset?: any
  close?: () => void
  hideShadow?: boolean
  hideArrow?: boolean
}

export default function Popover({
  content,
  show,
  children,
  placement = 'auto',
  style = {},
  referenceStyle = {},
  offset = [-22, 8],
  close,
  hideArrow = false,
  hideShadow = false, // used for tooltips
}: PopoverProps) {
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null)
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null)
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null)
  const { styles, update, attributes } = usePopper(referenceElement, popperElement, {
    placement,
    strategy: 'fixed',
    modifiers: [
      { name: 'offset', options: { offset } },
      { name: 'arrow', options: { element: arrowElement } },
    ],
  })
  const updateCallback = useCallback(() => {
    update && update()
  }, [update])
  useInterval(updateCallback, show ? 100 : null)

  return (
    <>
      <ReferenceElement style={referenceStyle} ref={setReferenceElement as any}>{children}</ReferenceElement>
      <Portal>
        {show && !hideShadow && (
          <Shadow
            onClick={() => {
              if (close instanceof Function) close()
            }}
          />
        )}
        <PopoverContainer
          show={show}
          ref={setPopperElement as any}
          style={{ ...styles.popper, ...style }}
          {...attributes.popper}
        >
          {content}
          {!hideArrow && (
            <Arrow
              className={`arrow-${attributes.popper?.['data-popper-placement'] ?? ''}`}
              ref={setArrowElement as any}
              style={styles.arrow}
              {...attributes.arrow}
            />
          )}
        </PopoverContainer>
      </Portal>
    </>
  )
}
