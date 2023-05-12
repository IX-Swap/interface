import React from 'react'
import { useMediaQuery } from '@mui/material'
import { CorporateAccreditationForm } from 'app/pages/identity/components/CorporateAccreditationForm/CorporateAccreditationForm'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { RootContainer } from 'ui/RootContainer'
import { useTheme } from '@mui/material/styles'

export interface CreateCorporateAccreditationProps {
  title?: string
}

export const CreateCorporateAccreditation = ({
  title
}: CreateCorporateAccreditationProps) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <>
      {matches ? null : <PageHeader title={title} />}
      <RootContainer>
        <CorporateAccreditationForm formTitle='Corporate Investor Accreditation' />
      </RootContainer>
    </>
  )
}
