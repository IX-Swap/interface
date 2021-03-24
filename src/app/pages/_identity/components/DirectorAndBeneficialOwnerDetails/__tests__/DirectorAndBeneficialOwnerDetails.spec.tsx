import { DirectorsAndBeneficialOwnerDetails } from 'app/pages/_identity/components/DirectorAndBeneficialOwnerDetails/DirectorsAndBeneficialOwnerDetails'
import { Form } from 'components/form/Form'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('DirectorAndBeneficialOwnerDetails', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <DirectorsAndBeneficialOwnerDetails />
      </Form>
    )
  })
})
