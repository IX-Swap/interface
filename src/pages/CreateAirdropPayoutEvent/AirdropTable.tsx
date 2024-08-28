import { Line } from 'components/Line'
import React, { FC } from 'react'
import { Box, Flex } from 'rebass'
import styled from 'styled-components'
import { TYPE } from 'theme'

interface TableProps {
  header: React.ReactNode
  body: React.ReactNode
}

export const AirdropTable: FC<TableProps> = ({ header, body }) => {
  return (
    <TableContainer>
      <HeaderContainer>
        <Flex justifyContent="space-between" mb={2} mt={2}>
          {header}
        </Flex>
        <Line style={{ margin: '20px 0px' }} />
      </HeaderContainer>
      <BodyContainer>{body}</BodyContainer>
    </TableContainer>
  )
}

interface HeaderProps {
  columns: string[]
}

export const Header: FC<HeaderProps> = ({ columns }) => (
  <>
    {columns.map((column, index) => (
      <TYPE.title11 color={'#B8B8CC'} key={index}>{column}</TYPE.title11>
    ))}
  </>
)

interface BodyProps {
  rows: string[][]
}

export const Body: FC<BodyProps> = ({ rows }) => (
  <>
    {rows.map((row, rowIndex) => (
      <React.Fragment key={rowIndex}>
        <Flex justifyContent="space-between" mb={1}>
          {row.map((cell, cellIndex) => (
            <TYPE.body2 key={cellIndex}>{cell}</TYPE.body2>
          ))}
        </Flex>
        <Line style={{ margin: '16px 0px' }} />
      </React.Fragment>
    ))}
  </>
)

const TableContainer = styled(Box)`
  border: 1px solid #e6e6ff;
  padding: 16px;
  border-radius: 8px;
  margin-top: 40px;
`

const HeaderContainer = styled(Box)`
  margin-bottom: 8px;
`

const BodyContainer = styled(Box)``
