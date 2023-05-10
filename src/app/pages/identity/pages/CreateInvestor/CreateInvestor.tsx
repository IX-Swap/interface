import React from 'react'
import { useMediaQuery } from '@mui/material'
import {
  CorporateInvestorForm,
  CorporateType
} from 'app/pages/identity/components/CorporateInvestorForm/CorporateInvestorForm'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { RootContainer } from 'ui/RootContainer'
import { useTheme } from '@mui/material/styles'

export interface CreateCorporateIdentityProps {
  type?: CorporateType
  title?: string
}

export const CreateCorporateIdentity = ({
  type = 'corporate',
  title
}: CreateCorporateIdentityProps) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <>
      {matches ? null : <PageHeader title={title} />}
      <RootContainer>
        <CorporateInvestorForm formTitle='Corporate Identity' type={type} />
      </RootContainer>
    </>
  )
}
