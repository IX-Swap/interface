import React from 'react'
import { render, cleanup } from 'test-utils'
import { UploadCSVButton } from 'app/pages/admin/components/UploadCSVButton/UploadCSVButton'
import * as useUploadVirtualAccountCSV from 'app/pages/admin/hooks/useUploadVirtualAccountCSV'

describe('UploadCSVButton', () => {
  const uploadCSVMock = jest.fn()

  beforeEach(() => {
    jest
      .spyOn(useUploadVirtualAccountCSV, 'useUploadVirtualAccountCSV')
      .mockImplementation(() => [uploadCSVMock, { isLoading: false }] as any)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<UploadCSVButton />)
  })
})
