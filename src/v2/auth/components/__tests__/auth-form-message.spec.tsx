import React from 'react'
import { render } from 'test-utils'
import AuthFormMessage from '../auth-form-message'
import { useUserStore } from 'v2/auth/context'

jest.mock('v2/auth/context')

// FIXME
const usePasswordResetStoreMocked = (useUserStore as unknown) as jest.Mock<
  Partial<ReturnType<typeof useUserStore>>
>

usePasswordResetStoreMocked.mockReturnValue({
  message: 'looks good',
  error: 'oh no'
})

describe('Copyright', () => {
  it('renders error conditionally', () => {
    const { getByTestId } = render(<AuthFormMessage />)
    const error = getByTestId('error')

    expect(error).toBeInTheDOM()
    expect(error).toHaveTextContent('oh no')
  })

  it('renders message conditionally', () => {
    const { getByTestId } = render(<AuthFormMessage />)
    const message = getByTestId('message')

    expect(message).toBeInTheDOM()
    expect(message).toHaveTextContent('looks good')
  })
})
