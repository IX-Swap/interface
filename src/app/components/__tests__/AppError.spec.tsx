import React from 'react'
import { FallbackProps } from 'react-error-boundary'
import { render } from 'test-utils'
import { AppError } from 'app/components/AppError'

describe('AppError', () => {
  const props: FallbackProps = { resetErrorBoundary: jest.fn() }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<AppError {...props} />)
  })
})
