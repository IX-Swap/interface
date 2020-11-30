import React from 'react'
import { TypedField } from 'components/form/TypedField'
import { Box, Grid, TextField } from '@material-ui/core'
import { VSpacer } from 'components/VSpacer'
import { booleanValueExtractor } from 'helpers/forms'
import { Checkbox } from 'components/form/Checkbox'
import { ApproveButton } from 'app/pages/authorizer/components/ApproveButton'
import { RejectButton } from 'app/pages/authorizer/components/RejectButton'
import { useFormContext } from 'react-hook-form'
import { AuthorizerFormValues } from 'app/pages/authorizer/components/AuthorizerForm'
import { AuthorizableStatus } from 'types/util'

export interface AuthorizerFormFieldsProps {
  status: AuthorizableStatus
  itemId: string
}

export const AuthorizerFormFields = (props: AuthorizerFormFieldsProps) => {
  const { itemId, status } = props
  const { control } = useFormContext<AuthorizerFormValues>()
  const comment = control.watchInternal('comment') as string
  const hasComment = comment !== undefined && comment.trim().length > 0
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
        disabled={!hasComment}
        label='Share this comment with the user'
        name='sharedWithUser'
      />
      <VSpacer size='medium' />
      <Grid container>
        <ApproveButton itemId={itemId} disabled={!canApprove} />
        <Box mx={1} />
        <RejectButton itemId={itemId} disabled={!canReject} />
      </Grid>
    </>
  )
}
