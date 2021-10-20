import { SecuritiesGrid } from 'app/pages/home/components/Securities/SecuritiesGrid'
import { SecuritiesTableView } from 'app/pages/home/components/Securities/SecuritiesTableView'
import { Security } from 'app/pages/home/components/Securities/SecurityCard'
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
