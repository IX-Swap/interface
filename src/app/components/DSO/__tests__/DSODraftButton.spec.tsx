import React from 'react'
import { render } from 'test-utils'
import { DSOForm } from 'app/components/DSO/DSOForm'
import { SaveDraftButton } from 'app/components/DSO/DSODraftButton'

jest.mock('app/components/DSO/DSODraftButton', () => ({
  SaveDraftButton: jest.fn(() => null)
}))

describe('DSO Save Draft Button', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders DSO Draft Button component', () => {
    render(<DSOForm />)
    expect(SaveDraftButton).toHaveBeenCalled()
  })
})
