import { Grid, Typography, Box, Container } from '@material-ui/core'
import React, { PropsWithChildren } from 'react'
import { VSpacer } from 'components/VSpacer'
import { formatDateAndTime } from 'helpers/dates'
import { AuthorizableWithIdentity, DataroomFeature } from 'types/authorizer'
import { AuthorizationDocuments } from 'app/pages/authorizer/components/AuthorizationDocuments'
import { AuthorizerForm } from 'app/pages/authorizer/components/AuthorizerForm'
import { AuthorizableLevel } from 'app/pages/authorizer/components/AuthorizableLevel'
import { AuthorizableStatus } from 'app/pages/authorizer/components/AuthorizableStatus'
import { AuthorizerIdentities } from 'app/pages/authorizer/components/AuthorizerIdentities'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { Form } from 'components/form/Form'
import { useAuthorizerCategory } from 'hooks/location/useAuthorizerCategory'
import { AuthorizerCategory } from 'types/app'
import { privateClassNames } from 'helpers/classnames'
import { DigitalSecurityOffering } from 'types/dso'

export interface AuthorizerViewProps<T> {
  title: string
  data: T & AuthorizableWithIdentity
  feature: typeof DataroomFeature[keyof typeof DataroomFeature]
}

const transactionalCategories = [
  AuthorizerCategory.CashDeposits,
  AuthorizerCategory.CashWithdrawals,
  AuthorizerCategory.DigitalSecurityWithdrawals,
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
  const { title, data, feature, children } = props
  const hasIdentity = data.identity !== undefined
  const documents = data.authorizationDocuments ?? []
  const approvedOrRejected = ['Approved', 'Rejected'].includes(data.status)
  const showForm = !(isTransaction && approvedOrRejected)

  return (
    <Container className={privateClassNames()}>
      <Grid container direction='column'>
        <Grid item>
          <PageHeader />
        </Grid>
        <Grid item>
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
                <Grid item style={{ marginBottom: 5 }}>
                  <Typography color='textSecondary'>
                    {formatDateAndTime(data.createdAt)}
                  </Typography>
                </Grid>

                <Grid
                  item
                  container
                  alignItems='center'
                  justify='space-between'
                  style={{ marginBottom: 24 }}
                >
                  <Typography variant='h3'>{title}</Typography>
                  <Box display='flex'>
                    <AuthorizableLevel level={data.level} compact={false} />
                    <Box px={0.5} />
                    <AuthorizableStatus status={data.status} compact={false} />
                  </Box>
                </Grid>

                <Grid item>{children}</Grid>

                <Grid item>
                  <VSpacer size='medium' />
                </Grid>

                <Grid item>
                  <Typography variant='h3'>Authorization Documents</Typography>
                  <VSpacer size='small' />
                  <Form
                    defaultValues={{
                      documents: documents.map(value => ({ value }))
                    }}
                  >
                    <AuthorizationDocuments
                      resourceId={data._id}
                      feature={feature}
                    />
                  </Form>
                </Grid>

                {showForm && (
                  <Grid item>
                    <AuthorizerForm status={data.status} itemId={data._id} />
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}
