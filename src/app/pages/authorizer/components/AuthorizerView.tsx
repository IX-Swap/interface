import {
  Grid
  // Box
} from '@mui/material'
import React, { PropsWithChildren } from 'react'
import { VSpacer } from 'components/VSpacer'
// import { formatDateAndTime } from 'helpers/dates'
import { AuthorizableWithIdentity, DataroomFeature } from 'types/authorizer'

import { AuthorizerForm } from 'app/pages/authorizer/components/AuthorizerForm'
// import { AuthorizableLevel } from 'app/pages/authorizer/components/AuthorizableLevel'
// import { AuthorizableStatus } from 'app/pages/authorizer/components/AuthorizableStatus'
import { AuthorizerIdentities } from 'app/pages/authorizer/components/AuthorizerIdentities'
import { PromotionSwitch } from 'app/pages/authorizer/components/PromotionSwitch'
import { PageHeader } from 'app/components/PageHeader/PageHeader'

import { useAuthorizerCategory } from 'hooks/location/useAuthorizerCategory'
import { AuthorizerCategory } from 'types/app'
import { privateClassNames } from 'helpers/classnames'
import { DigitalSecurityOffering } from 'types/dso'
import { VisibilitySwitch } from 'app/pages/authorizer/components/VisibilitySwitch'
import { RootContainer } from 'ui/RootContainer'
import { useStyles } from 'app/pages/authorizer/components/AuthorizerView.styles'
import { AuthorizerActions } from './AuthorizerActions/AuthorizerActions'
import { FormSectionHeader } from 'ui/FormSectionHeader/FormSectionHeader'
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'

export interface AuthorizerViewProps<T> {
  title: string
  data: T & AuthorizableWithIdentity
  feature: typeof DataroomFeature[keyof typeof DataroomFeature]
  statusFieldName?: string
}

const transactionalCategories = [
  AuthorizerCategory.CashWithdrawals,
  AuthorizerCategory.SecurityTokenWithdrawals,
  AuthorizerCategory.Commitments,
  AuthorizerCategory.Offerings,
  AuthorizerCategory.WithdrawalAddresses
]

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
  const isTransaction = transactionalCategories.includes(category)
  const { title, data, feature, children, statusFieldName = 'status' } = props
  const hasIdentity = false
  //   const hasIdentity = data.identity !== undefined
  const documents = data.authorizationDocuments ?? []
  const approvedOrRejected = ['Approved', 'Rejected'].includes(
    data[statusFieldName as keyof typeof data]
  )
  const showForm = !(isTransaction && approvedOrRejected)
  const styles = useStyles()
  // console.log(data, 'datadatadatadata')
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

                {category !== 'token-deployment' && (
                  <Grid
                    container
                    direction='column'
                    spacing={3}
                    sx={{ paddingLeft: '25px' }}
                  >
                    <FieldContainer>
                      <Grid item container direction={'column'} spacing={5}>
                        <Grid item>
                          <FormSectionHeader title='Authorizer Action (Optional)' />
                        </Grid>
                        <Grid item>
                          {category !== 'virtual-accounts' && (
                            <AuthorizerActions
                              id={data._id}
                              feature={feature}
                              documents={documents}
                            />
                          )}

                          {showForm && (
                            <Grid item style={{ marginTop: 20 }}>
                              <AuthorizerForm
                                status={
                                  data[statusFieldName as keyof typeof data]
                                }
                                itemId={data._id}
                                feature={feature}
                                listingType={data?.listingType}
                              />
                            </Grid>
                          )}

                          {category === AuthorizerCategory.Offerings && (
                            <Grid
                              container
                              item
                              justifyContent='flex-end'
                              style={{ marginTop: 20 }}
                            >
                              <PromotionSwitch
                                dso={data as unknown as DigitalSecurityOffering}
                              />

                              <VisibilitySwitch
                                dso={data as unknown as DigitalSecurityOffering}
                              />
                            </Grid>
                          )}
                        </Grid>
                      </Grid>
                    </FieldContainer>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </RootContainer>
      </Grid>
    </Grid>
  )
}
