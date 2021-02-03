import React from 'react'
import { TopList } from 'app/pages/home/components/TopList'
import { useTopCorporates } from 'app/pages/home/hooks/useTopCorporates'

export const TopCorporates = () => {
  const { data, isLoading } = useTopCorporates()

  if (isLoading || data === undefined) {
    return null
  }

  return (
    <TopList
      items={data.map(({ logo, companyLegalName, _id }) => ({
        imageURL: logo,
        label: companyLegalName,
        _id
      }))}
    />
  )
}
