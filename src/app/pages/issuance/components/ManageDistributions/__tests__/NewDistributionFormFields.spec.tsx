import { NewDistributionFormFields } from 'app/pages/issuance/components/ManageDistributions/NewDistributionFormFields'
import { Form } from 'components/form/Form'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('NewDistributionFormFields', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <NewDistributionFormFields
          currency='SGD'
          showOtp={false}
          showOTPForm={() => {}}
          closeOTPForm={() => {}}
        />
      </Form>
    )
  })
})
