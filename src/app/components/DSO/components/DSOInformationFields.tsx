import React, { Fragment } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { DSOBaseFields } from 'app/components/DSO/components/DSOBaseFields'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
// import { isDSOLive } from 'app/components/DSO/utils'
import { Grid } from '@mui/material'
import { VSpacer } from 'components/VSpacer'
import { DSOPricing } from 'app/components/DSO/components/DSOPricing'
import { DSOTerms } from 'app/components/DSO/components/DSOTerms'
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'
import { STOAssign } from './STOAssign'
import { useIsAdmin, useIsAuthorizer } from 'helpers/acl'

export const DSOInformationFields = () => {
  const { dsoId, issuerId } = useParams<{ dsoId: string; issuerId: string }>()
  const { pathname } = useLocation<{ pathname: string }>()
  const { data } = useDSOById(dsoId, issuerId)
  const isAuthorizer = useIsAuthorizer()
  const isAdmin = useIsAdmin()
  const isSuperUser = isAuthorizer || isAdmin
  // const isLive = isDSOLive(data)
  const isNew = pathname.includes('/create')
  return (
    <Fragment>
      {isSuperUser && (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FieldContainer>
                <STOAssign />
              </FieldContainer>
            </Grid>
          </Grid>
          <VSpacer size='small' />
        </>
      )}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FieldContainer>
            <DSOBaseFields
              status={data?.status}
              isNew={isNew}
              // isLive={isLive}
            />
          </FieldContainer>
        </Grid>
      </Grid>
      <VSpacer size='small' />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FieldContainer>
            <DSOPricing />
          </FieldContainer>
        </Grid>
      </Grid>
      <VSpacer size='small' />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FieldContainer>
            <DSOTerms />
          </FieldContainer>
        </Grid>
      </Grid>
    </Fragment>
  )
}
