import { DownloadTemplate } from 'app/pages/issuance/components/UploadReportForm/DownloadTemplate'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('DownloadTemplate', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders button as disabled when template url is undefined', () => {
    const { getByRole } = render(<DownloadTemplate />)
    expect(getByRole('button')).toBeDisabled()
  })
})
