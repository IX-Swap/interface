/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { CorporateIdCreate } from 'v2/app/pages/identity/pages/corporate/CorporateIdCreate'
import { PageTitle } from 'v2/app/components/PageTitle'
import { CorporateIdentityForm } from 'v2/app/pages/identity/components/CorporateIdentityForm'

jest.mock('v2/app/components/PageTitle', () => ({
  PageTitle: jest.fn(() => null)
}))
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

    expect(CorporateIdentityForm).toHaveBeenCalledTimes(1)
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

  it('renders PageTitle with correct props', () => {
    render(<CorporateIdCreate />)

    expect(PageTitle).toHaveBeenCalledTimes(1)
    expect(PageTitle).toHaveBeenNthCalledWith(
      1,
      { subPage: true, title: 'Create Corporate Identity' },
      {}
    )
  })
})
