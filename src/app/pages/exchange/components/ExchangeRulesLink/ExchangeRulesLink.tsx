import React from 'react'
import { Link } from '@material-ui/core'

export const ExchangeRulesLink = () => {
  return (
    <Link
      href='/documents/IXExchangeRules.pdf'
      target='_blank'
      rel='noopener noreferrer'
    >
      Exchange Rules
    </Link>
  )
}
