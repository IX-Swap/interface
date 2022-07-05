import React from 'react'
import QRCode from 'react-qr-code'
import styled from 'styled-components'

const Wrap = styled.div`
  width: fit-content;
  height: fit-content;
  padding: 16px;
  background: #fff;
  border-radius: 10px;
  position: relative;
  svg {
    > path[fill='#000000'] {
      fill: #000000;
    }
    > path[fill='#FFFFFF'] {
      fill: #ffffff;
    }
  }
`
export const QRCodeWrap = ({
  value,
  size = 256,
  level = 'Q',
  info = '',
}: {
  value: string
  size?: number
  level?: 'H' | 'L' | 'M' | 'Q'
  info?: string | JSX.Element
}) => {
  return (
    <Wrap>
      <QRCode value={value} size={size} level={level} />
      {!!info && info}
    </Wrap>
  )
}
