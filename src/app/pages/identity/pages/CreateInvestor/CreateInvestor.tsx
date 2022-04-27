import React from 'react'
import { Grid } from '@mui/material'
import { VSpacer } from 'components/VSpacer'
import {
  CorporateInvestorForm,
  CorporateType
} from 'app/pages/identity/components/CorporateInvestorForm/CorporateInvestorForm'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { useAllCorporates } from 'app/pages/identity/hooks/useAllCorporates'
import { generatePath, Redirect } from 'react-router-dom'
import { IdentityRoute } from 'app/pages/identity/router/config'

export interface CreateCorporateIdentityProps {
  type?: CorporateType
  title?: string
}

export const CreateCorporateIdentity = ({
  type = 'investor',
  title
}: CreateCorporateIdentityProps) => {
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
    <Grid container>
      <Grid item>
        <PageHeader title={title} />
      </Grid>
      <Grid container item>
        <VSpacer size='medium' />
      </Grid>
      <Grid item>
        <CorporateInvestorForm type={type} formTitle={title} />
      </Grid>
    </Grid>
  )
}
