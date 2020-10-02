/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { IndividualIdCreate } from 'v2/app/pages/identity/pages/individual/IndividualIdCreate'
import { PageTitle } from 'v2/app/components/PageTitle'
import { IndividualIdentityForm } from 'v2/app/pages/identity/components/IndividualIdentityForm'

jest.mock('v2/app/components/PageTitle', () => ({
  PageTitle: jest.fn(() => null)
}))
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

    expect(IndividualIdentityForm).toHaveBeenCalledTimes(1)
    expect(IndividualIdentityForm).toHaveBeenNthCalledWith(
      1,
      {
        identity: undefined,
        isEditing: true,
        useOwnEmail: false,
        submitButtonText: 'Create',
        cancelButton: expect.anything()
      },
      {}
    )
  })

  it('renders PageTitle with correct props', () => {
    render(<IndividualIdCreate />)

    expect(PageTitle).toHaveBeenCalledTimes(1)
    expect(PageTitle).toHaveBeenNthCalledWith(
      1,
      { subPage: true, title: 'Create Individual Identity' },
      {}
    )
  })
})
