import React from 'react'
import { render } from 'test-utils'
import { DSOForm, getCreateModeRedirect } from 'app/components/DSO/DSOForm'

describe('DSO Save Draft Button', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders DSO Draft button successfully', () => {
    const { getByText } = render(<DSOForm />)
    expect(getByText('Save Draft')).toBeTruthy()
  })
})
