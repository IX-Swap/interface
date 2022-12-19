import React, { Fragment } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { DSOBaseFields } from 'app/components/DSO/components/DSOBaseFields'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { isDSOLive } from 'app/components/DSO/utils'
import { Grid } from '@mui/material'
import { VSpacer } from 'components/VSpacer'
import { DSOPricing } from 'app/components/DSO/components/DSOPricing'
import { DSOTerms } from 'app/components/DSO/components/DSOTerms'
import { FieldContainer } from 'app/pages/identity/components/FieldContainer/FieldContainer'

export const DSOInformationFields = () => {
  const { dsoId, issuerId } = useParams<{ dsoId: string; issuerId: string }>()
  const { pathname } = useLocation<{ pathname: string }>()
  const { data } = useDSOById(dsoId, issuerId)
  const isLive = isDSOLive(data)
  const isNew = pathname.includes('/create')
  console.log(data, 'Live')
  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FieldContainer>
            <DSOBaseFields
              status={data?.status}
              isNew={isNew}
              isLive={isLive}
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
