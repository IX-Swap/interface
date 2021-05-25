import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSOForm } from 'app/components/DSO/DSOForm'
import { CreateDSO } from 'app/pages/issuance/pages/CreateDSO'

jest.mock('app/__tests__/DSO/DSOForm', () => ({
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
        isNew: true
      },
      {}
    )
  })
})
