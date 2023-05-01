import { Box, Grid } from '@mui/material'
import { ApproveButton } from 'app/pages/authorizer/components/ApproveButton'
import { AuthorizerFormValues } from 'app/pages/authorizer/components/AuthorizerForm'
import { RejectButton } from 'app/pages/authorizer/components/RejectButton'
import { useAuthorizerAction } from 'app/pages/authorizer/hooks/useAuthorizerAction'
import { Checkbox } from 'components/form/Checkbox'
import { TypedField } from 'components/form/TypedField'
import { VSpacer } from 'components/VSpacer'
import { booleanValueExtractor } from 'helpers/forms'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { AuthorizableStatus } from 'types/util'
import { TextInput } from 'ui/TextInput/TextInput'

export interface AuthorizerFormFieldsProps {
  status: AuthorizableStatus
  itemId: string
  listingType: string
}

export const AuthorizerFormFields = (props: AuthorizerFormFieldsProps) => {
  const { itemId, status, listingType } = props
  const { control } = useFormContext<AuthorizerFormValues>()
  const [approve, { isLoading: isApproving }] = useAuthorizerAction({
    id: itemId,
    action: 'approve',
    listingType: listingType
  })
  const [reject, { isLoading: isRejecting }] = useAuthorizerAction({
    id: itemId,
    action: 'reject',
    listingType: listingType
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
        component={TextInput}
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
      <Grid container sx={{ display: 'flex', justifyContent: 'end' }}>
        <ApproveButton disabled={!canApprove} approve={approve} />
        <Box mx={1} />
        <RejectButton disabled={!canReject} reject={reject} />
      </Grid>
    </>
  )
}
