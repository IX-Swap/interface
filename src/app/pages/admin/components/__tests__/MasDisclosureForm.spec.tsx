import React from 'react'
import { render } from 'test-utils'
import { MasDisclosureForm } from 'app/pages/admin/components/MasDisclosureForm'
import { MasDisclosureBaseFields } from 'app/pages/admin/components/MasDisclosureBaseFields'

jest.mock('app/pages/admin/components/MasDisclosureBaseFields', () => ({
  MasDisclosureBaseFields: jest.fn(() => <input />)
}))

describe('MasDisclosureForm', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<MasDisclosureForm />)
  })

  it('renders MasDisclosureBaseFields', () => {
    render(<MasDisclosureForm />)
    expect(MasDisclosureBaseFields).toHaveBeenCalledTimes(1)
  })
})
