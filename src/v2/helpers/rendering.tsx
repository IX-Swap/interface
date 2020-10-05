import React from 'react'
import { MenuItem } from '@material-ui/core'
import draftToHtml from 'draftjs-to-html'
import pdfIcon from 'assets/icons/documents/pdf.svg'
import docxIcon from 'assets/icons/documents/docx.svg'
import txtIcon from 'assets/icons/documents/txt.svg'
import unknownIcon from 'assets/icons/documents/unknown.svg'

export const renderMenu = (arr: any[]): JSX.Element[] => {
  return arr.map(
    ({
      value,
      label
    }: {
      value: string | number
      label: string
    }): JSX.Element => (
      <MenuItem key={value} value={value}>
        {label}
      </MenuItem>
    )
  )
}

export const wysiwygToHtml = (draft: string): string => {
  return draftToHtml(JSON.parse(draft))
}

export const documentIcons = {
  pdf: pdfIcon,
  txt: txtIcon,
  docx: docxIcon,
  unknown: unknownIcon
}
