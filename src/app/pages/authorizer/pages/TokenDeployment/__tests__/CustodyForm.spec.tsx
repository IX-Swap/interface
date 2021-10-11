import React from 'react'
import { render, cleanup } from 'test-utils'
import { CustodyForm } from 'app/pages/authorizer/pages/TokenDeployment/CustodyForm'
import { CustodyFormFields } from 'app/pages/authorizer/pages/TokenDeployment/CustodyFormFields'
import * as useTokenListing from 'app/pages/authorizer/hooks/useTokenListing'

jest.mock(
  'app/pages/authorizer/pages/TokenDeployment/CustodyFormFields',
  () => ({
    CustodyFormFields: jest.fn(() => null)
  })
)

describe('CustodyForm', () => {
  const mutate = jest.fn()
  const objResponse = [mutate, { isLoading: true }]

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    jest
      .spyOn(useTokenListing, 'useTokenListing')
      .mockImplementation(() => objResponse as any)
    render(<CustodyForm />)
  })

  it('renders CustodyFormFields with correct props', () => {
    jest
      .spyOn(useTokenListing, 'useTokenListing')
      .mockImplementation(() => objResponse as any)
    render(<CustodyForm />)

    expect(CustodyFormFields).toHaveBeenCalledWith({ isLoading: true }, {})
  })
})
