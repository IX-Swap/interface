import React from 'react'
import { TopList } from 'app/pages/home/components/TopList'
import { useTopCorporates } from 'app/pages/home/hooks/getTopCorporates'

export const TopCorporates = () => {
  const { data, isLoading } = useTopCorporates()

  if (isLoading || data === undefined) {
    return null
  }

  return <TopList items={data} />
}
