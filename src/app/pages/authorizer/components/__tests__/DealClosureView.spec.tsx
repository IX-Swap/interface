import { DealClosureView } from 'app/pages/authorizer/components/DealClosureView'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { closure } from '__fixtures__/closure'

describe('DealClosureView', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<DealClosureView data={closure} />)
  })
})
