import React from 'react'
import { render } from 'test-utils'
import {
  DownloadDocument,
  DownloadDocumentProps
} from 'components/dataroom/DownloadDocument'

describe('DownloadDocument', () => {
  const props: DownloadDocumentProps = { documentId: '', ownerId: '' }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<DownloadDocument {...props} />)
  })

  it("renders 'No file uploaded' if documentId is undefined", () => {
    const { container } = render(<DownloadDocument {...props} documentId='' />)

    expect(container).toHaveTextContent('No file uploaded')
  })

  it("renders 'No file uploaded' if ownerId is undefined", () => {
    const { container } = render(<DownloadDocument {...props} ownerId='' />)

    expect(container).toHaveTextContent('No file uploaded')
  })
})
