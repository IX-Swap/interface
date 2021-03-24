import { FileTypeIcon } from 'app/pages/_identity/components/UploadDocumentsForm/FileTypeIcon/FileTypeIcon'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('FileTypeIcon', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<FileTypeIcon fileType='png' />)
  })

  it('renders props correctly', () => {
    const { getByText } = render(<FileTypeIcon fileType='png' />)

    expect(getByText('.png')).toBeTruthy()
  })
})
