import { DirectorsAndBeneficialOwnerDetails } from 'app/pages/_identity/components/DirectorAndBeneficialOwnerDetails/DirectorsAndBeneficialOwnerDetails'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('DirectorAndBeneficialOwnerDetails', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<DirectorsAndBeneficialOwnerDetails />)
  })
})
