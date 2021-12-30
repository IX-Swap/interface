import { FileTypeIcon } from 'app/pages/identity/components/UploadDocumentsForm/FileTypeIcon/FileTypeIcon'
import React from 'react'
import { render } from 'test-utils'

describe('FileTypeIcon', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders props correctly', () => {
    const { getByText } = render(<FileTypeIcon fileType='png' />)

    expect(getByText('.png')).toBeTruthy()
  })
})
