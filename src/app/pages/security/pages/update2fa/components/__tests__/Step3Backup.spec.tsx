import React from 'react'
import { render } from 'test-utils'
import { Step3Backup } from 'app/pages/security/pages/update2fa/components/Step3Backup/Step3Backup'
import { fakeTwoFaData } from '__fixtures__/security'
import { BackupKey } from 'app/pages/security/pages/update2fa/components/BackupKey/BackupKey'

jest.mock(
  'app/pages/security/pages/update2fa/components/BackupKey/BackupKey',
  () => ({
    BackupKey: jest.fn(() => null)
  })
)

describe('Step3Backup', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders empty container if twoFaData is undefined', () => {
    const { container } = render(<Step3Backup twoFaData={undefined} />)
    expect(container).toBeEmpty()
  })

  it('renders 2fa key', () => {
    render(<Step3Backup twoFaData={fakeTwoFaData} />)
    expect(BackupKey).toHaveBeenCalledWith(
      expect.objectContaining({ value: fakeTwoFaData.key }),
      {}
    )
  })
})
