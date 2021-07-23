import { SecuritiesGrid } from 'app/pages/home/components/Securities/SecuritiesGrid'
import { Security } from 'app/pages/home/components/Securities/SecurityCard'
import React from 'react'

export interface ComparableSecuritiesProps {
  data: Security[]
}

export const ComparableSecurities = ({ data }: ComparableSecuritiesProps) => {
  return <SecuritiesGrid data={data} />
}
