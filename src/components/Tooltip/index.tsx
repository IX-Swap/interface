import React, { ReactNode, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import Popover, { PopoverProps } from '../Popover'

const TooltipContainer = styled.div`
  width: 256px;
  padding: 0.6rem 1rem;
  font-weight: 400;
  word-break: break-word;
`

const TooltipContainerFit = styled(TooltipContainer)`
  width: fit-content;
  max-width: 40vw;
  min-width: 256px;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
`
interface TooltipProps extends Omit<PopoverProps, 'content'> {
  text: ReactNode
}

interface TooltipContentProps extends Omit<PopoverProps, 'content'> {
  content: ReactNode
}

export default function Tooltip({ text, ...rest }: TooltipProps) {
  return <Popover content={<TooltipContainer>{text}</TooltipContainer>} hideShadow {...rest} />
}

export function TooltipLight({ text, ...rest }: TooltipProps) {
  return (
    <Popover offset={[-180, 10]} content={<TooltipContainerFit>{text}</TooltipContainerFit>} hideShadow {...rest} />
  )
}

export function TooltipContent({ content, ...rest }: TooltipContentProps) {
  return <Popover content={<TooltipContainer>{content}</TooltipContainer>} {...rest} />
}

export function MouseoverTooltip({ children, ...rest }: Omit<TooltipProps, 'show'>) {
  const [show, setShow] = useState(false)
  const open = useCallback(() => rest.text && setShow(true), [setShow])
  const close = useCallback(() => setShow(false), [setShow])
  const toggle = useCallback(() => rest.text && setShow((state) => !state), [setShow])

  useEffect(() => {
    window.addEventListener('scroll', close)
    return () => {
      window.removeEventListener('scroll', close)
    }
  }, [])

  return (
    <Tooltip {...rest} show={show}>
      <div onMouseEnter={open} onMouseLeave={close} onClick={toggle}>
        {children}
      </div>
    </Tooltip>
  )
}

export function MouseoverLightTooltip({ children, ...rest }: Omit<TooltipProps, 'show'>) {
  const [show, setShow] = useState(false)
  const open = useCallback(() => setShow(true), [setShow])
  const close = useCallback(() => setShow(false), [setShow])
  return (
    <TooltipLight {...rest} show={show}>
      <div onMouseEnter={open} onMouseLeave={close}>
        {children}
      </div>
    </TooltipLight>
  )
}

export function MouseoverTooltipContent({ content, children, ...rest }: Omit<TooltipContentProps, 'show'>) {
  const [show, setShow] = useState(false)
  const open = useCallback(() => setShow(true), [setShow])
  const close = useCallback(() => setShow(false), [setShow])

  return (
    <TooltipContent {...rest} show={show} content={content}>
      <div
        style={{ display: 'inline-block', lineHeight: 0, padding: '0.25rem' }}
        onMouseEnter={open}
        onMouseLeave={close}
      >
        {children}
      </div>
    </TooltipContent>
  )
}
