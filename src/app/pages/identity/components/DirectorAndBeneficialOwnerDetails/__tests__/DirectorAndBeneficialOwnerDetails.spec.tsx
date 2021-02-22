import { DirectorAndBeneficialOwnerDetails } from 'app/pages/identity/components/DirectorAndBeneficialOwnerDetails/DirectorAndBeneficialOwnerDetails'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('DirectorAndBeneficialOwnerDetails', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<DirectorAndBeneficialOwnerDetails />)
  })
})
