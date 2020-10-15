import React from 'react'
import { useTypedForm } from 'v2/components/form/useTypedForm'
import { Box, Grid } from '@material-ui/core'
import { ApproveButton } from './ApproveButton'
import { RejectButton } from './RejectButton'
import { VSpacer } from 'v2/components/VSpacer'

export interface AuthorizerFormValues {
  comment: string
  sharedWithUser: boolean
}

export interface AuthorizerFormProps {
  itemId: string
  defaultValues: AuthorizerFormValues
}

export const AuthorizerForm = (props: AuthorizerFormProps) => {
  const { itemId, defaultValues } = props
  const { TextField, Checkbox, Form } = useTypedForm<AuthorizerFormValues>()

  return (
    <Form defaultValues={defaultValues}>
      <TextField
        label='Comment / Remarks'
        name='comment'
        variant='outlined'
        inputProps={{
          multiline: true
        }}
      />
      <VSpacer size='small' />
      <Checkbox
        label='Share this comment with the user'
        name='sharedWithUser'
      />
      <VSpacer size='medium' />
      <Grid container>
        <ApproveButton itemId={itemId} />
        <Box mx={1} />
        <RejectButton itemId={itemId} />
      </Grid>
    </Form>
  )
}
