import React from 'react'
import { render } from 'test-utils'
import { ResendCode } from 'app/pages/security/pages/update2fa/components/ResendCode/ResendCode'
import { fireEvent, waitFor } from '@testing-library/dom'
import { act } from 'react-dom/test-utils'
import * as useGetEmailCode from 'app/pages/security/pages/update2fa/hooks/useGetEmailCode'

jest.useFakeTimers()

describe('ResendCode', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  afterAll(() => {
    jest.clearAllTimers()
    jest.useRealTimers()
  })

  it('renders correct text', async () => {
    const { getByText } = render(<ResendCode />)

    expect(getByText('Send')).toBeInTheDocument()

    fireEvent.click(getByText('Send'))

    await waitFor(() => {
      expect(getByText('Resend in 30 sec')).toBeInTheDocument()
    })

    act(() => {
      jest.advanceTimersByTime(30000)
    })

    await waitFor(() => {
      expect(getByText('Resend Code')).toBeInTheDocument()
    })
  })

  it('returns correct count of call get email code function on text click', async () => {
    const refetch = jest.fn()

    jest
      .spyOn(useGetEmailCode, 'useGetEmailCode')
      .mockImplementation(() => ({ isLoading: false, refetch } as any))

    const { getByText } = render(<ResendCode />)

    fireEvent.click(getByText('Send'))
    await waitFor(() => {
      expect(refetch).toHaveBeenCalledTimes(1)
    })

    fireEvent.click(getByText('Resend in 30 sec'))
    await waitFor(() => {
      expect(refetch).toHaveBeenCalledTimes(1)
    })

    act(() => {
      jest.advanceTimersByTime(30000)
    })
    fireEvent.click(getByText('Resend Code'))
    await waitFor(() => {
      expect(refetch).toHaveBeenCalledTimes(2)
    })
  })
})
