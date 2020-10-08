import React from 'react'
import { useTypedForm } from 'v2/components/form/useTypedForm'
import { Box, Grid } from '@material-ui/core'
import { ApproveButton } from './ApproveButton'
import { RejectButton } from './RejectButton'

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
  const { RichTextEditor, Checkbox, Form } = useTypedForm<
    AuthorizerFormValues
  >()

  return (
    <Form defaultValues={defaultValues}>
      <RichTextEditor label='Comment' name='comment' />
      <Checkbox
        label='Share this comment with the user'
        name='sharedWithUser'
      />
      <Box my={3} />
      <Grid container>
        <ApproveButton itemId={itemId} />
        <Box mx={1} />
        <RejectButton itemId={itemId} />
      </Grid>
    </Form>
  )
}
