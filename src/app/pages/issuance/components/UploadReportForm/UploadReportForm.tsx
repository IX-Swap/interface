import { UploadReportFormFields } from 'app/pages/issuance/components/UploadReportForm/UploadReportFormFields'
import { uploadReportFormValidationSchema } from 'app/pages/issuance/components/UploadReportForm/validation'
import { Form } from 'components/form/Form'
import React from 'react'

export const UploadReportForm = () => {
  return (
    <Form validationSchema={uploadReportFormValidationSchema}>
      <UploadReportFormFields />
    </Form>
  )
}
