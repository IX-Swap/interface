import React from 'react'
import { MenuItem } from '@material-ui/core'
import draftToHtml from 'draftjs-to-html'

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
