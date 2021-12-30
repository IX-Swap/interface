import React from 'react'
import { DSOInformationView } from 'app/components/DSO/DSOPreview/DSOInformationView'
import { render } from 'test-utils'
import { dso } from '__fixtures__/authorizer'

jest.mock('components/LabelledValue', () => ({
  LabelledValue: jest.fn(() => null)
}))

describe('DSOInformationView', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<DSOInformationView dso={dso} />)
  })
})
