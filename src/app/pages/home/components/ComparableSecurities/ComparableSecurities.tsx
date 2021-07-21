import { SecuritiesGrid } from 'app/pages/home/components/Securities/SecuritiesGrid'
import { Security } from 'app/pages/home/components/Securities/SecurityCard'
import React from 'react'

export interface ComporableSecuritiesProps {
  data: Security[]
}

export const ComporableSecurities = ({ data }: ComporableSecuritiesProps) => {
  return <SecuritiesGrid data={data} />
}
