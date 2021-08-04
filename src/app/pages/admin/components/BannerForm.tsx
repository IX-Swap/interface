import React from 'react'
import { Form } from 'components/form/Form'
// import { getDSOValidationSchema } from 'validation/dso'
// import { transformDSOToFormValues } from 'app/components/DSO/utils'
import { BannerBaseFields } from 'app/pages/admin/components/BannerBaseFields'

export const BannerForm = () => {
  return (
    <Form
      // validationSchema={getDSOValidationSchema(isNew, isLive)}
      // defaultValues={transformDSOToFormValues(data)}
      data-testid='dso-form'
      onSubmit={values => console.log(values)}
    >
      <BannerBaseFields />
    </Form>
  )
}
