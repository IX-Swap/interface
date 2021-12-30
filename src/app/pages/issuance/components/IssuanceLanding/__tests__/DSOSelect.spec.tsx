import React from 'react'
import { render } from 'test-utils'
import { DSOSelect } from 'app/pages/issuance/components/IssuanceLanding/DSOSelect'
import { dso } from '__fixtures__/authorizer'

describe('DSOSelect', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<DSOSelect options={[dso]} />)
  })
})
