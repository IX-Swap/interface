/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { FullHeight } from 'v2/app/components/FullHeight'

describe('FullHeight', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <FullHeight>{(height, ref) => <div data-testid='children' />}</FullHeight>
    )
  })
})
