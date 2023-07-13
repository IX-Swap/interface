import React from 'react'
import { render } from 'test-utils'
import { DSOForm } from 'app/components/DSO/DSOForm'
import { CreateDSO } from 'app/pages/issuance/pages/CreateDSO'

jest.mock('app/components/DSO/DSOForm', () => ({
  DSOForm: jest.fn(() => null)
}))

describe('CreateDSO', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders DSOForm with correct props', () => {
    const { getByText } = render(<CreateDSO />)

    expect(DSOForm).toHaveBeenCalledWith({}, {})

    expect(getByText('Create Digital Security Offering')).not.toBe(null)
  })
})