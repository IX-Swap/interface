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

export interface AuthorizerViewProps<T> {
  title: string
  data: T & AuthorizableWithIdentity
  feature: typeof DataroomFeature[keyof typeof DataroomFeature]
}

export const AuthorizerView = <T,>(
  props: PropsWithChildren<AuthorizerViewProps<T>>
) => {
  const { title, data, feature, children } = props
  const hasIdentity = data.identity !== undefined

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
                <Grid item>
                  <Typography color='textSecondary'>
                    {formatDateAndTime(data.createdAt)}
                  </Typography>
                </Grid>

                <Grid
                  item
                  container
                  justify='space-between'
                  style={{ marginBottom: 24 }}
                >
                  <Typography variant='h2'>{title}</Typography>
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
                  <AuthorizationDocuments
                    documents={data.authorizationDocuments ?? []}
                    resourceId={data._id}
                    feature={feature}
                  />
                </Grid>

                <Grid item>
                  <AuthorizerForm
                    itemId={data._id}
                    defaultValues={{
                      sharedWithUser:
                        data.authorization?.sharedWithUser ?? false,
                      comment: data.authorization?.comment ?? ''
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}
