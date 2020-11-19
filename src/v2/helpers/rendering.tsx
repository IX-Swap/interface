/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from 'react'
import { MenuItem } from '@material-ui/core'
import draftToHtml from 'draftjs-to-html'
import pdfIcon from 'assets/icons/documents/pdf.svg'
import docxIcon from 'assets/icons/documents/docx.svg'
import txtIcon from 'assets/icons/documents/txt.svg'
import unknownIcon from 'assets/icons/documents/unknown.svg'
import { Maybe } from 'v2/types/util'
import { WalletAddress } from 'v2/app/components/WalletAddress'

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

export const renderAddressColumn = (address: string): JSX.Element => (
  <WalletAddress address={address} />
)

export const wysiwygToHtml = (draft: string): string => {
  return draftToHtml(JSON.parse(draft))
}

export const renderPercentage = (value?: Maybe<Number>) => {
  // TODO: remove when backend is fixed
  if (value === null || value === undefined || value === 0) {
    return undefined
  }

  return <span>{Number.parseFloat(`${value}`) * 100} %</span>
}

export const renderMonths = (value: string | number | undefined | null) =>
  value !== undefined ? `${value} months` : undefined

export const documentIcons = {
  pdf: pdfIcon,
  txt: txtIcon,
  docx: docxIcon,
  unknown: unknownIcon
}
