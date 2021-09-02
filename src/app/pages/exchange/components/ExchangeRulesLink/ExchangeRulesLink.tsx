import React from 'react'
import ExchangeRulesPDF from 'assets/documents/IXExchangeRules.pdf'
import { Link } from '@material-ui/core'

export const ExchangeRulesLink = () => {
  return (
    <Link href={ExchangeRulesPDF} target='_blank' rel='noopener noreferrer'>
      Exchange Rules
    </Link>
  )
}
