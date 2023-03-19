import React, { ReactNode, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components/macro'

import { ReactComponent as InfoIcon } from 'assets/images/attention.svg'

import Popover, { PopoverProps } from '../Popover'

export const IconWrapper = styled.div<{ size?: number, strokeColor?: string }>`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  margin-right: 4px;
  & > img,
  span {
    height: ${({ size }) => (size ? size + 'px' : '32px')};
    width: ${({ size }) => (size ? size + 'px' : '32px')};
  }
  ${({ theme }) => theme.mediaWidth.upToMedium`
    align-items: flex-end;
  `};
  & > svg:hover > path {
    stroke: ${({ strokeColor }) => (strokeColor ? strokeColor : '')}
  }
`

const TooltipContainer = styled.div<{ width?: number }>`
  width: ${({ width }) => (width ? width : 256)}px;
  padding: 0.6rem 1rem;
  font-weight: 400;
  word-break: break-word;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    width: 100%;
    padding: 1rem;
  `};
`

const TooltipContainerFit = styled(TooltipContainer)`
  width: fit-content;
  max-width: 40vw;
  min-width: 256px;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
`

const TooltipContainerVetting = styled.div`
  font-size: 12px;
  font-weight: 500; 
  line-height: 150%;
  width: 245px;
  padding: 0.8rem 1.2rem;
  word-break: break-word;
`

interface TooltipProps extends Omit<PopoverProps, 'content'> {
  text: ReactNode
  width?: number
  textStyle?: any
}

interface TooltipContentProps extends Omit<PopoverProps, 'content'> {
  content: ReactNode
}

export default function Tooltip({ text, width, ...rest }: TooltipProps) {
  return <Popover content={<TooltipContainer width={width}>{text}</TooltipContainer>} hideShadow {...rest} />
}

export function TooltipLight({ text, ...rest }: TooltipProps) {
  return (
    <Popover offset={[-180, 10]} content={<TooltipContainerFit>{text}</TooltipContainerFit>} hideShadow {...rest} />
  )
}

export function TooltipVetting({ text, ...rest }: TooltipProps) {
  return (
    <Popover offset={[-20, 15]} content={<TooltipContainerVetting>{text}</TooltipContainerVetting>} hideShadow {...rest} />
  )
}

export function TooltipContent({ content, ...rest }: TooltipContentProps) {
  return <Popover content={<TooltipContainer>{content}</TooltipContainer>} {...rest} />
}

export function MouseoverTooltip({ children, style, ...rest }: Omit<TooltipProps, 'show'>) {
  const [show, setShow] = useState(false)
  const open = useCallback(() => rest.text && setShow(true), [setShow, rest.text])
  const close = useCallback(() => setShow(false), [setShow])
  const toggle = useCallback(() => rest.text && setShow((state) => !state), [setShow, rest.text])

  useEffect(() => {
    window.addEventListener('scroll', close)
    return () => {
      window.removeEventListener('scroll', close)
    }
  }, [])

  return (
    <Tooltip {...rest} style={rest?.textStyle || {}} show={show}>
      <div onMouseEnter={open} onMouseLeave={close} onClick={toggle} style={style}>
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

export function MouseoverVettingTooltip({ children, ...rest }: Omit<TooltipProps, 'show'>) {
  const [show, setShow] = useState(false)
  const open = useCallback(() => setShow(true), [setShow])
  const close = useCallback(() => setShow(false), [setShow])
  return (
    <TooltipVetting {...rest} show={show}>
      <div onMouseEnter={open} onMouseLeave={close}>
        {children}
      </div>
    </TooltipVetting>
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

export const InfoMouseoverTooltip = ({ text, ...rest }: Omit<TooltipProps, 'show'>) => {
  return (
    <MouseoverTooltip text={text} placement={'top-end'} {...rest}>
      <IconWrapper size={20} style={{ transform: 'rotate(180deg)', marginLeft: '7px' }}>
        <InfoIcon />
      </IconWrapper>
    </MouseoverTooltip>
  )
}
