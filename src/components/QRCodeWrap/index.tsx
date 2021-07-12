import React from 'react'
import QRCode from 'react-qr-code'
import styled from 'styled-components'

const Wrap = styled.div`
  width: fit-content;
  height: fit-content;
  padding: 16px;
  background: #fff;
  border-radius: 10px;
`
export const QRCodeWrap = ({
  value,
  size = 256,
  level = 'Q',
}: {
  value: string
  size?: number
  level?: 'H' | 'L' | 'M' | 'Q'
}) => {
  return (
    <Wrap>
      <QRCode value={value} size={size} level={level} />
    </Wrap>
  )
}
