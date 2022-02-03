import React from 'react'
import { render } from 'test-utils'
import { Step3Backup } from 'app/pages/security/components/Step3Backup/Step3Backup'
import { fakeTwoFaData } from '__fixtures__/security'

describe('Step3Backup', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders 2fa key', () => {
    const { container } = render(<Step3Backup twoFaData={fakeTwoFaData} />)
    expect(container.querySelector('h4')).toHaveTextContent(fakeTwoFaData.key)
  })
})
