import React from 'react'
import { render } from 'test-utils'
import { Setup2fa } from 'app/pages/security/pages/setup2fa/Setup2fa'
import * as useSetup2fa from 'app/pages/security/pages/setup2fa/hooks/useSetup2fa'
import { fakeTwoFaData } from '__fixtures__/security'

describe('Setup2fa', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    jest.spyOn(useSetup2fa, 'useSetup2fa').mockReturnValue({
      data: fakeTwoFaData,
      isLoading: false
    } as any)

    const { container } = render(<Setup2fa />)
    expect(container).toMatchSnapshot()
  })

  it('renders Next button if step is not last', () => {
    const { queryByRole } = render(<Setup2fa />)

    const nextButton = queryByRole('button')
    expect(nextButton).not.toBeNull()
  })
})
