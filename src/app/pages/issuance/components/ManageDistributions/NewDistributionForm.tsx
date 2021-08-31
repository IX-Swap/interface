import { NewDistributionFormFields } from 'app/pages/issuance/components/ManageDistributions/NewDistributionFormFields'
import { Form } from 'components/form/Form'
import React, { useState } from 'react'

export const NewDistributionForm = () => {
  const [showOTP, setShowOTP] = useState(false)
  const showOTPForm = () => {
    setShowOTP(true)
  }

  const closeOTPForm = () => {
    setShowOTP(false)
  }

  const handleSubmit = () => {}

  return (
    <>
      <Form
        defaultValues={{ pricePerToken: null, distributionDate: null }}
        onSubmit={handleSubmit}
      >
        <NewDistributionFormFields
          currency='SGD'
          showOtp={showOTP}
          showOTPForm={showOTPForm}
          closeOTPForm={closeOTPForm}
        />
      </Form>
    </>
  )
}
