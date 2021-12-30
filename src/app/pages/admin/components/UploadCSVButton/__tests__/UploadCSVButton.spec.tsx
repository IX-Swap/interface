import React from 'react'
import { render } from 'test-utils'
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
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<UploadCSVButton />)
  })
})
