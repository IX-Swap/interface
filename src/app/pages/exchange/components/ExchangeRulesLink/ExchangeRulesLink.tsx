import React from 'react'
import { Link } from '@material-ui/core'
import { generateImgSrc } from 'helpers/generateImgSrc'

export const ExchangeRulesLink = () => {
  return (
    <Link
      href={generateImgSrc('/IXExchangeRules.pdf')}
      target='_blank'
      rel='noopener noreferrer'
    >
      Exchange Rules
    </Link>
  )
}
