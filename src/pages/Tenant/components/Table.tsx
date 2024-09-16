import React from 'react'
import styled from 'styled-components'

interface TableProps {
  dataSource: any[]
  columns: {
    title: string
    dataIndex: string
    render?: (text: any, record: any) => React.ReactNode
    fixed?: boolean | string
    align?: 'left' | 'right' | 'center'
    width?: string | number
  }[]
}

const Table: React.FC<TableProps> = ({ dataSource, columns }) => {
  return (
    <TableContainer>
      <TableStyled className="table">
        <Thead>
          <tr>
            {columns.map((column) => (
              <Th key={column.dataIndex} fixed={column.fixed} align={column.align} width={column.width}>
                {column.title}
              </Th>
            ))}
          </tr>
        </Thead>
        <Tbody>
          {dataSource.map((item, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <Td key={column.dataIndex} fixed={column.fixed} align={column.align} width={column.width}>
                  {column.render ? column.render(item[column.dataIndex], item) : item[column.dataIndex]}
                </Td>
              ))}
            </tr>
          ))}
        </Tbody>
      </TableStyled>
    </TableContainer>
  )
}

export default Table

const TableContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  overflow-x: auto;
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
`

const TableStyled = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
`

const Thead = styled.thead``

const Tbody = styled.tbody`
  tr {
    &:hover {
      background-color: #f5f5f5;
    }
  }
`

const Th = styled.th<{ fixed?: boolean | string; align?: string; width?: string | number }>`
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 24px;
  padding-bottom: 24px;
  text-align: ${(props) => props.align || 'left'};
  color: #8f8fb2;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.28px;
  border-bottom: 1px solid #e6e6ff;
  position: ${(props) => (props.fixed ? 'sticky' : 'static')};
  width: ${(props) => (props.width ? (typeof props.width === 'number' ? `${props.width}px` : props.width) : 'auto')};

  ${(props) =>
    props.fixed === 'left' ? 'left: 0; z-index: 1;' : props.fixed === 'right' ? 'right: 0; z-index: 1;' : ''}

  /* Optional: Add a shadow to emphasize fixed columns */
  box-shadow: ${(props) =>
    props.fixed === 'left'
      ? '2px 0 5px -2px rgba(0, 0, 0, 0.1)'
      : props.fixed === 'right'
      ? '-2px 0 5px -2px rgba(0, 0, 0, 0.1)'
      : 'none'};
`

const Td = styled.td<{ fixed?: boolean | string; align?: string; width?: string | number }>`
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 20px;
  padding-bottom: 20px;
  text-align: ${(props) => props.align || 'left'};
  border-bottom: 1px solid #e6e6ff;
  position: ${(props) => (props.fixed ? 'sticky' : 'static')};
  width: ${(props) => (props.width ? (typeof props.width === 'number' ? `${props.width}px` : props.width) : 'auto')};
  color: #292933;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.14px;

  ${(props) =>
    props.fixed === 'left' ? 'left: 0; z-index: 1;' : props.fixed === 'right' ? 'right: 0; z-index: 1;' : ''}

  /* Optional: Add a shadow to emphasize fixed columns */
  box-shadow: ${(props) =>
    props.fixed === 'left'
      ? '2px 0 5px -2px rgba(0, 0, 0, 0.1)'
      : props.fixed === 'right'
      ? '-2px 0 5px -2px rgba(0, 0, 0, 0.1)'
      : 'none'};
`
