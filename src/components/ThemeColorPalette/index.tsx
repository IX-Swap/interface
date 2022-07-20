import { readableColor } from 'polished'
import React from 'react'
import styled from 'styled-components/macro'
import { colors } from 'theme'

const Swatch = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100px;
  justify-content: center;
  min-width: 200px;
`

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`

export default function ThemePalette() {
  const data = colors()
  return (
    <Wrapper>
      {Object.entries(data).map(([key, value]) => (
        <Swatch key={key} style={{ color: readableColor(value), backgroundColor: value }}>
          <div>{key}</div>
          <div>{value}</div>
        </Swatch>
      ))}
    </Wrapper>
  )
}
