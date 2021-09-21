import React from 'react'
import { render, cleanup } from 'test-utils'
import { dso } from '__fixtures__/authorizer'
import { DSOInvestorInformationView } from 'app/components/DSO/components/DSOInvestorInformationView'

describe('DSOInvestorInformationView', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DSOInvestorInformationView dso={dso} />)
  })
})
