import { DirectorsAndBeneficialOwnerDetails } from 'app/pages/identity/components/DirectorAndBeneficialOwnerDetails/DirectorsAndBeneficialOwnerDetails'
import { Form } from 'components/form/Form'
import React from 'react'
import { render } from 'test-utils'

describe('DirectorAndBeneficialOwnerDetails', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(
      <Form>
        <DirectorsAndBeneficialOwnerDetails />
      </Form>
    )
  })
})
