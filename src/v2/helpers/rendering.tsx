import React from 'react'
import { MenuItem } from '@material-ui/core'
import draftToHtml from 'draftjs-to-html'

export const renderMenu = (arr: any[]) => {
  const options = arr.map(
    ({
      value,
      label
    }: {
      value: string | number
      label: string
    }): JSX.Element => {
      return React.createElement(
        MenuItem,
        {
          key: value,
          value
        },
        label
      )
    }
  )

  return options
}

export const wysiwygToHtml = (draft: string): string => {
  return draftToHtml(JSON.parse(draft))
}
