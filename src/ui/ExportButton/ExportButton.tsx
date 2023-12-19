import React, { MouseEventHandler } from 'react'
import { Button, Box, ButtonProps } from '@mui/material'
import { FileDownload } from '@mui/icons-material'
import { isEmpty } from 'lodash'
import { TableColumn } from 'types/util'
import get from 'lodash/get'

interface ExportButtonProps extends ButtonProps {
  fileName?: string
  columns?: Array<TableColumn<any>>
  rows?: any
  fullWidth?: boolean
  convertFromJSON?: boolean
  id?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export const download = (data: BlobPart, fileName = 'CSV Export') => {
  const blob = new Blob([data], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')

  a.setAttribute('href', url)
  a.setAttribute('download', `${fileName}.csv`)
  a.click()
}

export const ExportButton = ({
  fileName = 'CSV Export',
  columns = [],
  rows = [],
  fullWidth = false,
  convertFromJSON = true,
  onClick,
  ...rest
}: ExportButtonProps) => {
  const convertJSONtoCSV = (rows: object[]) => {
    const csvRows = []

    if (!isEmpty(columns)) {
      csvRows.push(columns.map(col => col.label).join(','))
    }

    rows.forEach(row => {
      const values: string[] = []

      columns.forEach(col => {
        let cellValue =
          col.key.length > 0 &&
          (typeof col.render === 'function'
            ? col.render(get(row, col.key), row)
            : col.key.constructor.name === 'Array'
            ? `${get(row, col.key[0].split(',')[0]) as string}/${
                get(row, col.key[0].split(',')[1]) as string
              }`
            : get(row, col.key))

        if (typeof cellValue === 'object' && 'side' in cellValue.props) {
          cellValue = cellValue.props.side === 'ASK' ? 'Sell' : 'Buy'
        }

        console.log(cellValue)

        values.push(`"${cellValue as string}"`)
      })

      csvRows.push(values.join(','))
    })

    return csvRows.join('\n')
  }

  return (
    <Button
      variant='contained'
      disableElevation
      fullWidth={fullWidth}
      onClick={e => {
        if (typeof onClick === 'function') {
          onClick(e)
        } else {
          const data = convertFromJSON ? convertJSONtoCSV(rows) : rows

          download(data, fileName)
        }
      }}
      sx={{ paddingX: 3 }}
      {...rest}
    >
      <FileDownload />
      <Box ml={0.5}>Export as CSV</Box>
    </Button>
  )
}
