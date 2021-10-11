import { NewDistributionFormFields } from 'app/pages/issuance/components/ManageDistributions/NewDistributionFormFields'
import { useCreateDistribution } from 'app/pages/issuance/hooks/useCreateDistribution'
import { Form } from 'components/form/Form'
import React, { useState } from 'react'
import { useParams } from 'react-router'

export const NewDistributionForm = () => {
  const { dsoId } = useParams<{ dsoId: string }>()
  const [createDistribution, { isLoading }] = useCreateDistribution()
  const [showOTP, setShowOTP] = useState(false)

  const showOTPForm = () => {
    setShowOTP(true)
  }

  const closeOTPForm = () => {
    setShowOTP(false)
  }

  const handleSubmit = async (args: any) => {
    closeOTPForm()
    await createDistribution({ ...args, dso: dsoId })
  }

  return (
    <>
      <Form
        defaultValues={{
          amountPerToken: null,
          distributionDate: null,
          otp: null
        }}
        onSubmit={handleSubmit}
        resetAfterSubmit
      >
        <NewDistributionFormFields
          currency='SGD'
          showOtp={showOTP}
          showOTPForm={showOTPForm}
          closeOTPForm={closeOTPForm}
          disabled={isLoading}
        />
      </Form>
    </>
  )
}
