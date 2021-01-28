import React from 'react'
import { TopList } from 'app/pages/home/components/TopList'
import { useTopIssuers } from 'app/pages/home/hooks/useTopIssuers'

export const TopIssuers = () => {
  const { data, isLoading } = useTopIssuers()

  if (isLoading || data === undefined) {
    return null
  }

  return <TopList items={data} />
}
