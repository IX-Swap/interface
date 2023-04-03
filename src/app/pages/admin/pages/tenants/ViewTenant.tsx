/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from 'react'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { useHistory, useParams } from 'react-router-dom'
import { Grid, Typography, Button, Link } from '@mui/material'
import { RootContainer } from 'ui/RootContainer'
import { tenantsURL } from 'config/apiURL'
import apiService from 'services/api'
import { tenantsQueryKeys } from 'config/queryKeys'
import { useQuery } from 'react-query'
import { AdminRoute } from '../../router/config'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { FieldContainer } from 'app/pages/identity/components/FieldContainer/FieldContainer'
import { renderStringToHTML } from 'app/components/DSO/utils'
import { DataroomImage } from 'ui/DataRoomImage'
import { useAppTheme } from 'hooks/useAppTheme'

export const ViewTenant = () => {
  const { tenantId } = useParams<{ tenantId: string; issuerId: string }>()
  const url = tenantsURL.getTenantInfoById(tenantId)
  const getInfo = async () => await apiService.get(url)
  const { replace } = useHistory()
  const { isTablet } = useAppBreakpoints()
  const { theme } = useAppTheme()

  const { data: result, isLoading } = useQuery(
    tenantsQueryKeys.getTenantById,
    getInfo
  )

  if (isLoading) {
    return null
  }

  if (result === undefined) {
    replace(AdminRoute.tenants)
  }

  const {
    url: siteUrl,
    companyName,
    description,
    email,
    tenantCode,
    theme: themeName,
    logoDark,
    logoLight,
    backgroundImage
  } = result.data

  return (
    <Grid container direction='column' style={{ display: 'table' }}>
      <Grid item>
        <PageHeader title='Tenant' />
      </Grid>
      <RootContainer>
        <Grid container direction={isTablet ? 'column-reverse' : 'row'}>
          <Grid item xs={12}>
            <FieldContainer>
              <Grid container direction='row' alignItems='center' spacing={2}>
                <Grid item>
                  <DataroomImage
                    photoId={
                      theme.palette.mode === 'light' ? logoLight : logoDark
                    }
                    width={60}
                    height={60}
                    sx={{ borderRadius: '100%' }}
                  />
                </Grid>
                <Grid item>
                  <Typography variant='h4'>{`${companyName} (${tenantCode})`}</Typography>
                  <Typography>{email}</Typography>
                </Grid>
                <Grid item>
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      backgroundColor: themeName,
                      borderRadius: '5px'
                    }}
                  ></div>
                </Grid>
                <Grid item marginLeft={'auto'}>
                  <Button
                    variant='contained'
                    disableElevation
                    component={Link}
                    size='large'
                    fullWidth={isTablet}
                    href={siteUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Visit Site
                  </Button>
                </Grid>
              </Grid>
              <Grid item sx={{ marginTop: '30px' }}>
                <Typography>{renderStringToHTML(description)}</Typography>
              </Grid>
              <Grid item>
                <DataroomImage
                  photoId={backgroundImage}
                  width={'100%'}
                  height={'auto'}
                  sx={{ marginTop: '30px', borderRadius: '20px' }}
                />
              </Grid>
            </FieldContainer>
          </Grid>
        </Grid>
      </RootContainer>
    </Grid>
  )
}
