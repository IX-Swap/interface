import React from 'react'
import { render } from 'test-utils'
import { dso } from '__fixtures__/authorizer'
import { DSOInvestorInformationView } from 'app/components/DSO/components/DSOInvestorInformationView'

describe('DSOInvestorInformationView', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<DSOInvestorInformationView dso={dso} />)
  })
})
