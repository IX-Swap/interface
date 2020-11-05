import { Grid, Typography, Box, Container } from '@material-ui/core'
import React, { PropsWithChildren } from 'react'
import { VSpacer } from 'v2/components/VSpacer'
import { formatDateAndTime } from 'v2/helpers/dates'
import { AuthorizableWithIdentity, DataroomFeature } from 'v2/types/authorizer'
import { AuthorizationDocuments } from 'v2/app/pages/authorizer/components/AuthorizationDocuments'
import { AuthorizerForm } from 'v2/app/pages/authorizer/components/AuthorizerForm'
import { AuthorizableLevel } from 'v2/app/pages/authorizer/components/AuthorizableLevel'
import { AuthorizableStatus } from 'v2/app/pages/authorizer/components/AuthorizableStatus'
import { AuthorizerIdentities } from 'v2/app/pages/authorizer/components/AuthorizerIdentities'
import { PageHeader } from 'v2/app/components/PageHeader/PageHeader'
import { Form } from 'v2/components/form/Form'
import { useAuthorizerCategory } from 'v2/hooks/location/useAuthorizerCategory'
import { AuthorizerCategory } from 'v2/types/app'

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
  AuthorizerCategory.Offerings
]

export const AuthorizerView = <T,>(
  props: PropsWithChildren<AuthorizerViewProps<T>>
) => {
  const category = useAuthorizerCategory()
  const isTransaction = transactionalCategories.includes(category)
  const { title, data, feature, children } = props
  // debugger
  const hasIdentity = data.identity !== undefined
  const documents = data.authorizationDocuments ?? []
  const approvedOrRejected = ['Approved', 'Rejected'].includes(data.status)
  const showForm = !(isTransaction && approvedOrRejected)

  return (
    <Container>
      <Grid container direction='column'>
        <Grid item>
          <PageHeader />
        </Grid>
        <Grid item>
          <Grid container spacing={6}>
            {hasIdentity && (
              <AuthorizerIdentities
                corporates={data.identity?.corporates}
                individual={data.identity?.individual}
              />
            )}
            <Grid item xs={hasIdentity ? 9 : 12}>
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
