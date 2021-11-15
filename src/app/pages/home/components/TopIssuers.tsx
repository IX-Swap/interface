import React from 'react'
import { TopList } from 'app/pages/home/components/TopList'
import { useTopIssuers } from 'app/pages/home/hooks/useTopIssuers'
import { getPersonName } from 'helpers/strings'

export const TopIssuers = () => {
  const { data, isLoading } = useTopIssuers()

  if (isLoading || data === undefined) {
    return null
  }

  return (
    <TopList
      items={data.map(({ _id, firstName, middleName, lastName, user }) => ({
        user: user as unknown as string,
        label: getPersonName({
          firstName,
          middleName,
          lastName
        } as any) as string,
        _id
      }))}
    />
  )
}
