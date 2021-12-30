import { DealClosureView } from 'app/pages/authorizer/components/DealClosureView'
import React from 'react'
import { render } from 'test-utils'
import { closure } from '__fixtures__/closure'

describe('DealClosureView', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<DealClosureView data={closure} />)
  })
})
