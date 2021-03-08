import React from 'react'
import { render, cleanup } from 'test-utils'
import { IndividualIdCreate } from 'app/pages/identity/pages/individual/IndividualIdCreate'

jest.mock('app/pages/identity/components/IndividualIdentityForm', () => ({
  IndividualIdentityForm: jest.fn(() => null)
}))

describe('IndividualIdCreate', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<IndividualIdCreate />)
  })
})
