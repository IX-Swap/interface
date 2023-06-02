import { UploadReportFormFields } from 'app/pages/issuance/components/UploadReportForm/UploadReportFormFields'
import { uploadReportFormValidationSchema } from 'app/pages/issuance/components/UploadReportForm/validation'
import { Form } from 'components/form/Form'
import React from 'react'
import { FormPrompt } from 'app/pages/issuance/components/UploadReportForm/FormPrompt'
import { useUploadReportFile } from 'app/pages/issuance/hooks/useUploadReportFile'
import { UploadReportFormValues } from 'types/financialReports'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'

export const UploadReportForm = () => {
  const { getFilterValue } = useQueryFilter()
  const [uploadReportFile] = useUploadReportFile()

  const handleSubmit = async (values: UploadReportFormValues) => {
    await uploadReportFile({
      ...values,
      dso: getFilterValue('dso'),
      reportDocuments: values.reportDocuments.map(doc => doc.value._id)
    })
  }

  return (
    <Form
      validationSchema={uploadReportFormValidationSchema}
      onSubmit={handleSubmit}
      defaultValues={{
        reportDocuments: [{ value: {} }] as any
      }}
    >
      <FormPrompt />
      <UploadReportFormFields />
    </Form>
  )
}