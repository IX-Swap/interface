import React from 'react'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { useHomeRouter } from 'app/pages/home/router'
import { RootContainer } from 'ui/RootContainer'

export const HomeRoot = () => {
  const { renderRoutes } = useHomeRouter()

  return (
    <RootContainer>
      <PageHeader alignment='flex-start' />
      {renderRoutes()}
    </RootContainer>
  )
}
