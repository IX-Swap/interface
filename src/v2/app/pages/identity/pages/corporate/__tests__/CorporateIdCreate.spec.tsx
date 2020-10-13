/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { CorporateIdCreate } from 'v2/app/pages/identity/pages/corporate/CorporateIdCreate'
import { CorporateIdentityForm } from 'v2/app/pages/identity/components/CorporateIdentityForm'

jest.mock('v2/app/pages/identity/components/CorporateIdentityForm', () => ({
  CorporateIdentityForm: jest.fn(() => null)
}))

describe('CorporateIdCreate', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<CorporateIdCreate />)
  })

  it('renders CorporateIdentityForm with correct props', () => {
    render(<CorporateIdCreate />)

    expect(CorporateIdentityForm).toHaveBeenCalledWith(
      {
        identity: undefined,
        isEditing: true,
        useOwnEmail: false,
        submitButtonText: 'Create',
        onSubmit: expect.any(Function),
        cancelButton: expect.anything()
      },
      {}
    )
  })
})
