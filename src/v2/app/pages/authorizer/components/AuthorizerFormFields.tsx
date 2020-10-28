import React from 'react'
import { TypedField } from 'v2/components/form/TypedField'
import { Box, Grid, TextField } from '@material-ui/core'
import { VSpacer } from 'v2/components/VSpacer'
import { booleanValueExtractor } from 'v2/helpers/forms'
import { Checkbox } from 'v2/components/form/Checkbox'
import { ApproveButton } from 'v2/app/pages/authorizer/components/ApproveButton'
import { RejectButton } from 'v2/app/pages/authorizer/components/RejectButton'
import { useFormContext } from 'react-hook-form'
import { AuthorizerFormValues } from 'v2/app/pages/authorizer/components/AuthorizerForm'
import { AuthorizableStatus } from 'v2/types/util'
import { useAuthorizerCategory } from 'v2/hooks/location/useAuthorizerCategory'
import { AuthorizerCategory } from 'v2/types/app'

export interface AuthorizerFormFieldsProps {
  status: AuthorizableStatus
  itemId: string
}

const transactionalCategories = [
  AuthorizerCategory['Cash Deposits'],
  AuthorizerCategory['Cash Withdrawals'],
  AuthorizerCategory['Digital Security Withdrawals'],
  AuthorizerCategory.Commitments
]

export const AuthorizerFormFields = (props: AuthorizerFormFieldsProps) => {
  const { itemId, status } = props
  const { control } = useFormContext<AuthorizerFormValues>()
  const category = useAuthorizerCategory()
  const isTransaction = transactionalCategories.includes(category)
  const rejectedOrApproved = status === 'Rejected' || status === 'Approved'
  const canApprove = status === 'Submitted' || status === 'Rejected'
  const canReject = status === 'Submitted' || status === 'Approved'

  return (
    <>
      <TypedField
        control={control}
        customRenderer
        component={TextField}
        fullWidth
        variant='outlined'
        label='Comment / Remarks'
        name='comment'
        multiline
      />
      <VSpacer size='small' />
      {/* @ts-ignore */}
      <TypedField
        customRenderer
        valueExtractor={booleanValueExtractor}
        component={Checkbox}
        control={control}
        label='Share this comment with the user'
        name='sharedWithUser'
      />
      <VSpacer size='medium' />
      <Grid container>
        <ApproveButton
          itemId={itemId}
          disabled={isTransaction ? rejectedOrApproved : !canApprove}
        />
        <Box mx={1} />
        <RejectButton
          itemId={itemId}
          disabled={isTransaction ? rejectedOrApproved : !canReject}
        />
      </Grid>
    </>
  )
}
