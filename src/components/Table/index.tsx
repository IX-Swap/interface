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
    padding-left: 0px;
  }

  > div:last-child {
    padding-right: 22px;
    padding-left: 0px;
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
  // ${rowStyle};
  > div {
    // padding: 10px 9px;
    font-weight: 500;
    font-size: 12px;
    color: ${({ theme: { text11 } }) => text11};
  }
  div:nth-last-child(2) {
    padding: 10px 7px;
  }
`

export const BodyRow = styled.div`
  ${rowStyle};
  border-bottom: 1px solid #e6e6ff;
  margin-bottom: 8px;
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
