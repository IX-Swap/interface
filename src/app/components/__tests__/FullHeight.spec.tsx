import React from 'react'
import { render } from 'test-utils'
import { FullHeight } from 'app/components/FullHeight'

describe('FullHeight', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(
      <FullHeight>{(height, ref) => <div data-testid='children' />}</FullHeight>
    )
  })
})
