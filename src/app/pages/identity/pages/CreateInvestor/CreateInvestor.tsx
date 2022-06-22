import React from 'react'
import { useMediaQuery } from '@mui/material'
import {
  CorporateInvestorForm,
  CorporateType
} from 'app/pages/identity/components/CorporateInvestorForm/CorporateInvestorForm'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { useAllCorporates } from 'app/pages/identity/hooks/useAllCorporates'
import { generatePath, Redirect } from 'react-router-dom'
import { IdentityRoute } from 'app/pages/identity/router/config'
import { RootContainer } from 'ui/RootContainer'
import { useTheme } from '@mui/material/styles'

export interface CreateCorporateIdentityProps {
  type?: CorporateType
  title?: string
}

export const CreateCorporateIdentity = ({
  type = 'investor',
  title
}: CreateCorporateIdentityProps) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))
  const { data, isSuccess } = useAllCorporates({ type })

  if (isSuccess && data.list.length > 0) {
    const {
      _id: identityId,
      user: { _id: userId }
    } = data.list[0]

    return (
      <Redirect
        to={generatePath(IdentityRoute.editCorporate, { identityId, userId })}
      />
    )
  }

  return (
    <>
      {matches ? null : <PageHeader title={title} />}
      <RootContainer>
        <CorporateInvestorForm
          formTitle='Corporate Investor Identity'
          type={type}
        />
      </RootContainer>
    </>
  )
}
