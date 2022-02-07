import React from 'react'
import { TypedField } from 'components/form/TypedField'
import { Box, Grid, TextField } from '@mui/material'
import { VSpacer } from 'components/VSpacer'
import { booleanValueExtractor } from 'helpers/forms'
import { Checkbox } from 'components/form/Checkbox'
import { ApproveButton } from 'app/pages/authorizer/components/ApproveButton'
import { RejectButton } from 'app/pages/authorizer/components/RejectButton'
import { useFormContext } from 'react-hook-form'
import { AuthorizerFormValues } from 'app/pages/authorizer/components/AuthorizerForm'
import { AuthorizableStatus } from 'types/util'
import { useAuthorizerAction } from 'app/pages/authorizer/hooks/useAuthorizerAction'

export interface AuthorizerFormFieldsProps {
  status: AuthorizableStatus
  itemId: string
}

export const AuthorizerFormFields = (props: AuthorizerFormFieldsProps) => {
  const { itemId, status } = props
  const { control } = useFormContext<AuthorizerFormValues>()
  const [approve, { isLoading: isApproving }] = useAuthorizerAction({
    id: itemId,
    action: 'approve'
  })
  const [reject, { isLoading: isRejecting }] = useAuthorizerAction({
    id: itemId,
    action: 'reject'
  })
  const comment = control.watchInternal('comment') as string
  const hasComment = comment !== undefined && comment.trim().length > 0
  const isProcessing = isApproving || isRejecting

  const canShareComment = !isProcessing && hasComment
  const canApprove = !isProcessing && ['Submitted', 'Rejected'].includes(status)
  const canReject = !isProcessing && ['Submitted', 'Approved'].includes(status)

  return (
    <>
      <TypedField
        control={control}
        customRenderer
        component={TextField}
        fullWidth
        variant='outlined'
        disabled={isProcessing}
        label='Comment / Remarks'
        name='comment'
        multiline
      />
      <VSpacer size='small' />

      <TypedField
        customRenderer
        valueExtractor={booleanValueExtractor}
        component={Checkbox}
        control={control}
        disabled={!canShareComment}
        label='Share this comment with the user'
        name='sharedWithUser'
      />
      <VSpacer size='medium' />
      <Grid container>
        <ApproveButton disabled={!canApprove} approve={approve} />
        <Box mx={1} />
        <RejectButton disabled={!canReject} reject={reject} />
      </Grid>
    </>
  )
}
