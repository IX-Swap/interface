import { SecuritiesGrid } from 'app/pages/educationCentre/components/Securities/SecuritiesGrid'
import { SecuritiesTableView } from 'app/pages/educationCentre/components/Securities/SecuritiesTableView'
import { Security } from 'app/pages/educationCentre/components/Securities/SecurityCard'
import React from 'react'

export interface SecuritiesProps {
  data?: Security[]
  isLoading: boolean
  view: 'grid' | 'list'
}

export const Securities = ({ data, isLoading, view }: SecuritiesProps) => {
  return (
    <>
      {view === 'grid' ? (
        <SecuritiesGrid data={data} isLoading={isLoading} />
      ) : (
        <SecuritiesTableView data={data} isLoading={isLoading} />
      )}
    </>
  )
}
