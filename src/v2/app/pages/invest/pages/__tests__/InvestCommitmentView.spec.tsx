/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import InvestCommitmentView from 'v2/app/pages/invest/pages/InvestCommitmentView'

describe('InvestCommitmentView', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<InvestCommitmentView />)
  })
})
