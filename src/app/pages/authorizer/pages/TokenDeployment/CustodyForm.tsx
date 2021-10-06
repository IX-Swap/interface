import { useTokenListing } from 'app/pages/authorizer/hooks/useTokenListing'
import { CustodyFormFields } from 'app/pages/authorizer/pages/TokenDeployment/CustodyFormFields'
import { Form } from 'components/form/Form'
import React from 'react'
import * as yup from 'yup'

export const custodyFormValidationSchema = yup.object().shape({
  custody: yup.string().required('This is a required field')
})

export const CustodyForm = () => {
  const [setCustody, { isLoading }] = useTokenListing()
  const handleSubmit = async (args: any) => {
    await setCustody(args)
  }

  return (
    <Form
      onSubmit={handleSubmit}
      validationSchema={custodyFormValidationSchema}
    >
      <CustodyFormFields isLoading={isLoading} />
    </Form>
  )
}
