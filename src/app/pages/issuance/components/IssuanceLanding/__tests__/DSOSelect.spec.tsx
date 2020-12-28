import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSOSelect } from 'app/pages/issuance/components/IssuanceLanding/DSOSelect'
import { dso } from '__fixtures__/authorizer'

describe('DSOSelect', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DSOSelect options={[dso]} />)
  })
})
