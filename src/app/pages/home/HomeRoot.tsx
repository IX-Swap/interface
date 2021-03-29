import React from 'react'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { RootContainer } from 'ui/RootContainer'
import { useAuth } from 'hooks/auth/useAuth'
import { Onboarding } from 'app/pages/home/pages/Onboarding'

export const HomeRoot = () => {
  const { user } = useAuth()

  return (
    <RootContainer>
      <PageHeader
        alignment='flex-start'
        title={`Welcome, ${user?.name ?? ''}`}
      />
      <Onboarding />
    </RootContainer>
  )
}
