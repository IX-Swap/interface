import React, { ReactElement } from 'react'
import styled, { css } from 'styled-components'

interface Props {
  style?: Record<string, string | number>
  header: ReactElement
  body: ReactElement
}

export const Table = ({ header, body, style }: Props) => (
  <Wrap style={style}>
    {header}
    {body}
  </Wrap>
)

const rowStyle = css`
  position: relative;
  display: grid;

  > div:first-child {
    padding-left: 22px;
  }

  > div:last-child {
    padding-right: 22px;
  }

  > div {
    display: flex;
    align-items: center;
    padding: 20px 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

export const HeaderRow = styled.div`
  ${rowStyle};
  > div {
    padding: 10px 12px;
    font-weight: 300;
    font-size: 16px;
    color: ${({ theme: { text2 } }) => text2};
  }
`

export const BodyRow = styled.div`
  ${rowStyle};
  border: 1px solid ${({ theme: { bg11 } }) => bg11};
  border-radius: 20px;
  margin-bottom: 8px;
  background-color: rgba(39, 31, 74, 0.3);
`

const Wrap = styled.div`
  overflow-x: auto;
  > :last-child {
    margin-bottom: 0px;
  }
`

export const CellPrimary = styled.div`
  font-weight: bold;
  cursor: pointer;
  background-color: var(--black0);
`

export const CellSecondary = styled.div`
  color: var(--black70);
  background-color: var(--black0);
`
