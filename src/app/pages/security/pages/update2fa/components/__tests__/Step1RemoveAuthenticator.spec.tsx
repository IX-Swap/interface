import React from 'react'
import { render } from 'test-utils'
import { Step1RemoveAuthenticator } from 'app/pages/security/pages/update2fa/components/Step1RemoveAuthenticator/Step1RemoveAuthenticator'

describe('Step1RemoveAuthenticator', () => {
  const handleSuccessfulRemoveAuthenticator = jest.fn()

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('should match snapshot when useGetEmailCode has successful response', () => {
    const { container } = render(
      <Step1RemoveAuthenticator
        onSuccessRemoveAuthenticator={handleSuccessfulRemoveAuthenticator}
      />
    )

    expect(container).toMatchSnapshot()
  })
})
