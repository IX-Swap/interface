import React, { ReactNode, useCallback, useState } from 'react'
import styled from 'styled-components/macro'
import Tooltip from '../Tooltip'
import { ReactComponent as TootipIcon } from 'assets/images/newTooltip.svg'

const QuestionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px;
  width: 18px;
  height: 18px;
  border: none;
  background: none;
  outline: none;
  cursor: default;
  border-radius: 36px;
  font-size: 12px;
  cursor: pointer;
  // background-color: ${({ theme }) => theme.bg24};
  // color: ${({ theme }) => theme.text12};

  :hover,
  :focus {
    opacity: 0.7;
  }
`

const QuestionMark = styled.span`
  font-size: 14px;
`

export default function QuestionHelper({ text, width }: { text: ReactNode; width?: number }) {
  const [show, setShow] = useState<boolean>(false)

  const open = useCallback(() => setShow(true), [setShow])
  const close = useCallback(() => setShow(false), [setShow])

  return (
    <span style={{ marginLeft: 4, display: 'flex', alignItems: 'center' }}>
      <Tooltip text={text} show={show} width={width}>
        <QuestionWrapper onClick={open} onMouseEnter={open} onMouseLeave={close}>
          <TootipIcon />
        </QuestionWrapper>
      </Tooltip>
    </span>
  )
}
