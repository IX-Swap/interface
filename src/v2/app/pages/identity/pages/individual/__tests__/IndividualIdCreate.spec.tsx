/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { IndividualIdCreate } from 'v2/app/pages/identity/pages/individual/IndividualIdCreate'
import { IndividualIdentityForm } from 'v2/app/pages/identity/components/IndividualIdentityForm'

jest.mock('v2/app/pages/identity/components/IndividualIdentityForm', () => ({
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

  it('renders IndividualIdentityForm with correct props', () => {
    render(<IndividualIdCreate />)

    expect(IndividualIdentityForm).toHaveBeenCalledWith(
      {
        identity: undefined,
        isNew: true,
        submitButtonText: 'Create',
        cancelButton: expect.anything()
      },
      {}
    )
  })
})
