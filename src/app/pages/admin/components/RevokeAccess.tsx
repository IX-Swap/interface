import React from 'react'
import * as yup from 'yup'
import { Form } from 'components/form/Form'
import { ButtonError } from 'app/components/ButtonError'
import { RevokeAccessFields } from 'app/pages/admin/components/RevokeAccessFields'
import { VSpacer } from 'components/VSpacer'
import { useRevokeAccess } from 'app/pages/admin/hooks/useRevokeAccess'
import { hasValue } from 'helpers/forms'

export interface RevokeAccessInputs {
  sessionId?: string
}

export const RevokeAccess = () => {
  const [revokeAccess] = useRevokeAccess()

  const handleSubmit = async (data: RevokeAccessInputs) => {
    const sessionId = hasValue(data.sessionId) ? data.sessionId : undefined
    await revokeAccess(sessionId)
  }

  const detaultValues = {
    sessionId: ''
  }

  const validationSchema = yup.object({
    sessionId: yup.string().optional()
  })

  return (
    <Form
      onSubmit={handleSubmit}
      defaultValues={detaultValues}
      validationSchema={validationSchema}
    >
      <RevokeAccessFields />
      <VSpacer size='small' />
      <ButtonError type='submit'>REVOKE ACCESS TOKEN</ButtonError>
    </Form>
  )
}
