import React from 'react'
import { renderWithUserStore } from 'test-utils'
import AuthFormMessage from 'v2/Auth/components/AuthFormMessage'
import { cleanup } from '@testing-library/react'

describe('Copyright', () => {
  afterEach(cleanup)

  it('renders error conditionally', () => {
    const error = 'oh no'
    const { getByTestId } = renderWithUserStore(<AuthFormMessage />, { error })
    const errorEl = getByTestId('error')

    expect(errorEl).toBeInTheDOM()
    expect(errorEl).toHaveTextContent(error)
  })

  it('renders message conditionally', () => {
    const message = 'looks good'
    const { getByTestId } = renderWithUserStore(<AuthFormMessage />, {
      message
    })
    const messageEl = getByTestId('message')

    expect(messageEl).toBeInTheDOM()
    expect(messageEl).toHaveTextContent(message)
  })
})
