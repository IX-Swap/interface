import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSOInformationView } from 'app/components/DSO/DSOPreview/DSOInformationView'
import { dso } from '__fixtures__/authorizer'

describe('DSOInformationView', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DSOInformationView dso={dso} />)
  })
})
