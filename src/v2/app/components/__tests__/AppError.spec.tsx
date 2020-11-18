import React from 'react'
import { FallbackProps } from 'react-error-boundary'
import { render, cleanup } from 'test-utils'
import { AppError } from 'v2/app/components/AppError'

describe('AppError', () => {
  const props: FallbackProps = { resetErrorBoundary: jest.fn() }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<AppError {...props} />)
  })
})
