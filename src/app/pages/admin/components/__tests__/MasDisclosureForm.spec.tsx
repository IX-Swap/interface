import React from 'react'
import { render, cleanup } from 'test-utils'
import { MasDisclosureForm } from 'app/pages/admin/components/MasDisclosureForm'
import { MasDisclosureBaseFields } from 'app/pages/admin/components/MasDisclosureBaseFields'

jest.mock('app/pages/admin/components/MasDisclosureBaseFields', () => ({
  MasDisclosureBaseFields: jest.fn(() => <input />)
}))

describe('MasDisclosureForm', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<MasDisclosureForm />)
  })

  it('renders MasDisclosureBaseFields', () => {
    render(<MasDisclosureForm />)
    expect(MasDisclosureBaseFields).toHaveBeenCalledTimes(1)
  })
})
