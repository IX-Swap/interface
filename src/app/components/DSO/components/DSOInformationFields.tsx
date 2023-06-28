import React, { Fragment } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { STOInformation } from 'app/components/DSO/components/fields/STOInformation'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { Grid } from '@mui/material'
import { VSpacer } from 'components/VSpacer'
import { Pricing } from 'app/components/DSO/components/fields/Pricing'
import { OfferingTerms } from 'app/components/DSO/components/fields/OfferingTerms'
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'
import { STOAssign } from './STOAssign'
import { useIsAdmin, useIsAuthorizer } from 'helpers/acl'
import { BlockchainInformation } from './fields/BlockchainInformation'
import { STODates } from './fields/STODates'
import { useAllCorporates } from 'app/pages/identity/hooks/useAllCorporates'

export const DSOInformationFields = () => {
  const { dsoId, issuerId } = useParams<{ dsoId: string; issuerId: string }>()
  const { pathname } = useLocation<{ pathname: string }>()
  const { data } = useDSOById(dsoId, issuerId)
  const isAuthorizer = useIsAuthorizer()
  const isAdmin = useIsAdmin()
  const isSuperUser = isAuthorizer || isAdmin
  const isNew = pathname.includes('/create')
  const corporateData = useAllCorporates({ all: true, status: 'Approved' })
  return (
    <Fragment>
      {isSuperUser &&  (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FieldContainer>
                <STOAssign
                  editableData={data}
                  corporateData={corporateData?.data}
                />
              </FieldContainer>
            </Grid>
          </Grid>
          <VSpacer size='small' />
        </>
      )}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FieldContainer>
            <STOInformation status={data?.status} />
          </FieldContainer>
        </Grid>
      </Grid>
      <VSpacer size='small' />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FieldContainer>
            <BlockchainInformation status={data?.status} isNew={isNew} />
          </FieldContainer>
        </Grid>
      </Grid>
      <VSpacer size='small' />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FieldContainer>
            <Pricing />
          </FieldContainer>
        </Grid>
      </Grid>
      <VSpacer size='small' />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FieldContainer>
            <STODates status={data?.status} />
          </FieldContainer>
        </Grid>
      </Grid>
      <VSpacer size='small' />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FieldContainer>
            <OfferingTerms />
          </FieldContainer>
        </Grid>
      </Grid>
    </Fragment>
  )
}
