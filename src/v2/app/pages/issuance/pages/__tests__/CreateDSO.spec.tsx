import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSOForm } from 'v2/app/components/DSO/DSOForm'
import { CreateDSO } from 'v2/app/pages/issuance/pages/CreateDSO'

jest.mock('v2/app/components/DSO/DSOForm', () => ({
  DSOForm: jest.fn(() => null)
}))

describe('CreateDSO', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<CreateDSO />)
  })

  it('renders DSOForm with correct props', () => {
    render(<CreateDSO />)

    expect(DSOForm).toHaveBeenCalledWith(
      {
        isEditing: true,
        isNew: true,
        submitButtonLabel: 'Create DSO',
        onSubmit: expect.any(Function)
      },
      {}
    )
  })
})
