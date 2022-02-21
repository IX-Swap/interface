import React from 'react'
import { render } from 'test-utils'
import { Step3Backup } from 'app/pages/security/pages/update2fa/components/Step3Backup/Step3Backup'
import { fakeTwoFaData } from '__fixtures__/security'

describe('Step3Backup', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders empty container if twoFaData is undefined', () => {
    const { container } = render(<Step3Backup twoFaData={undefined} />)
    expect(container).toBeEmpty()
  })

  it('renders 2fa key', () => {
    const { getByTestId } = render(<Step3Backup twoFaData={fakeTwoFaData} />)
    expect(getByTestId('key')).toHaveTextContent(fakeTwoFaData.key)
  })
})
