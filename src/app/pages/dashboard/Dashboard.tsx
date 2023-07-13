import React from 'react'
import { Grid } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { RootContainer } from 'ui/RootContainer'
import { AccountActions } from './AccountActions/AccountActions'
import { TotalStats } from './TotalStats/TotalStats'
import { PrimaryOfferings } from 'app/pages/invest/components/PrimaryOfferings'
import {
  useIsAccredited,
  useIsRetail,
  useIsExpert,
  useIsInstitutional
} from 'helpers/acl'

export const Dashboard = () => {
  const isAccredited = useIsAccredited()
  const isRetail = useIsRetail()
  const isExpert = useIsExpert()
  const isInstitutional = useIsInstitutional()
  const hasAccreditation = isAccredited || isExpert || isInstitutional
  const isInvestor = isRetail || hasAccreditation

  return (
    <Grid container direction='column' style={{ display: 'table' }}>
      <Grid item>
        <PageHeader title={'Dashboard'} />
      </Grid>
      <RootContainer>
        <Grid container direction='column' spacing={2}>
          <Grid item>
            <AccountActions />
          </Grid>
          {isInvestor && (
            <>
              {hasAccreditation && (
                <Grid item>
                  <TotalStats />
                </Grid>
              )}
              <Grid item>
                <PrimaryOfferings />
              </Grid>
            </>
          )}
        </Grid>
      </RootContainer>
    </Grid>
  )
}
