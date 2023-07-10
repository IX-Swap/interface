import { Grid } from '@mui/material'
import React, { PropsWithChildren } from 'react'
import { VSpacer } from 'components/VSpacer'
import { AuthorizableWithIdentity, DataroomFeature } from 'types/authorizer'

import { AuthorizerIdentities } from 'app/pages/authorizer/components/AuthorizerIdentities'
import { PageHeader } from 'app/components/PageHeader/PageHeader'

import { useAuthorizerCategory } from 'hooks/location/useAuthorizerCategory'
import { privateClassNames } from 'helpers/classnames'
import { DigitalSecurityOffering } from 'types/dso'
import { RootContainer } from 'ui/RootContainer'
import { useStyles } from 'app/pages/authorizer/components/AuthorizerView.styles'
import { AuthorizerViewActions } from './AuthorizerViewActions'

export interface AuthorizerViewProps<T> {
  title: string
  data: T & AuthorizableWithIdentity
  feature: typeof DataroomFeature[keyof typeof DataroomFeature]
  statusFieldName?: string
  hideActions?: boolean
}

const getCorporates = (data: AuthorizableWithIdentity) => {
  if (typeof (data as DigitalSecurityOffering).launchDate === 'string') {
    return [(data as DigitalSecurityOffering).corporate]
  }

  return data.identity?.corporates
}

export const AuthorizerView = <T,>(
  props: PropsWithChildren<AuthorizerViewProps<T>>
) => {
  const category = useAuthorizerCategory()
  const {
    title,
    data,
    feature,
    children,
    statusFieldName = 'status',
    hideActions = false
  } = props
  const hasIdentity = false
  //   const hasIdentity = data.identity !== undefined

  const styles = useStyles()

  return (
    <Grid container direction='column' spacing={4} display='table'>
      <Grid item>
        <PageHeader title={title} />
      </Grid>

      <Grid item className={styles.wrapper} style={{ paddingTop: 0 }}>
        <RootContainer
          className={privateClassNames()}
          style={{ paddingTop: 0 }}
        >
          <Grid container spacing={6} wrap='wrap-reverse'>
            {hasIdentity && (
              <Grid item xs={12} md={3}>
                <AuthorizerIdentities
                  corporates={getCorporates(data)}
                  individual={data.identity?.individual}
                />
              </Grid>
            )}

            <Grid item xs={12} md={hasIdentity ? 9 : 12}>
              <Grid container direction='column'>
                {/* <Grid item style={{ marginBottom: 5 }}>
                  <Typography color='textSecondary'>
                    {formatDateAndTime(data.createdAt ?? data.assignedAt)}
                  </Typography>
                </Grid>

                <Grid
                  item
                  container
                  alignItems='center'
                  justifyContent='space-between'
                  style={{ marginBottom: 24 }}
                >
                  <Typography variant='h3'>
                    {category === 'virtual-accounts'
                      ? 'About This Virtual Account'
                      : title}
                  </Typography>
                  <Box display='flex'>
                    <AuthorizableLevel level={data.level} compact={false} />
                    <Box px={0.5} />
                    <AuthorizableStatus
                      status={data[statusFieldName as keyof typeof data]}
                      compact={false}
                      isNewTheme
                    />
                  </Box>
                </Grid> */}

                <Grid item>{children}</Grid>

                <Grid item>
                  <VSpacer size='medium' />
                </Grid>

                {category !== 'token-deployment' && !hideActions && (
                  <AuthorizerViewActions
                    data={data}
                    feature={feature}
                    statusFieldName={statusFieldName}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        </RootContainer>
      </Grid>
    </Grid>
  )
}
