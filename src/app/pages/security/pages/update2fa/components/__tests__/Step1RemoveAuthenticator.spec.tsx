import React from 'react'
import { render } from 'test-utils'
import { Step1RemoveAuthenticator } from 'app/pages/security/pages/update2fa/components/Step1RemoveAuthenticator/Step1RemoveAuthenticator'
import * as useGetEmailCode from 'app/pages/security/pages/update2fa/hooks/useGetEmailCode'
import { fireEvent, waitFor } from '@testing-library/dom'

describe('Step1RemoveAuthenticator', () => {
  const handleSuccessfulRemoveAuthenticator = jest.fn()

  const getEmailCodeSuccessfulResponse = {
    data: { email: 'test' },
    refetch: jest.fn()
  }

  const getEmailCodeUnsuccessfulResponse = {
    data: undefined,
    refetch: jest.fn()
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders send code button when data is undefined, invoke refetch on click', async () => {
    jest
      .spyOn(useGetEmailCode, 'useGetEmailCode')
      .mockImplementation(() => getEmailCodeUnsuccessfulResponse as any)

    const { getByText } = render(
      <Step1RemoveAuthenticator
        onSuccessRemoveAuthenticator={handleSuccessfulRemoveAuthenticator}
      />
    )

    expect(getByText('Send code')).toBeInTheDocument()
    fireEvent.click(getByText('Send code'))

    await waitFor(() => {
      expect(getEmailCodeUnsuccessfulResponse.refetch).toHaveBeenCalled()
    })
  })

  it('should match snapshot when useGetEmailCode has successful response', () => {
    jest
      .spyOn(useGetEmailCode, 'useGetEmailCode')
      .mockImplementation(() => getEmailCodeSuccessfulResponse as any)

    const { container } = render(
      <Step1RemoveAuthenticator
        onSuccessRemoveAuthenticator={handleSuccessfulRemoveAuthenticator}
      />
    )

    expect(container).toMatchSnapshot()
  })
})
