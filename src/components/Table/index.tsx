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
  ${rowStyle};
  > div {
    // padding: 10px 10px;
    font-weight: 500;
    font-size: 14px;
    color: ${({ theme: { text11 } }) => text11};
  }
`

export const BodyRow = styled.div`
  ${rowStyle};
  // border: 1px solid ${({ theme: { bg11 } }) => bg11};
  border-bottom: 1px solid #e6e6ff;
  // border-radius: 20px;
  margin-bottom: 8px;
  // background-color: ${({ theme: { config } }) => config.background?.main || 'rgba(39, 31, 74, 0.3)'};
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
