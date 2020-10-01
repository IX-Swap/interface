/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  DownloadDocument,
  DownloadDocumentProps
} from 'v2/app/pages/identity/components/dataroom/DownloadDocument'

describe('DownloadDocument', () => {
  const props: DownloadDocumentProps = { documentId: '', ownerId: '' }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DownloadDocument {...props} />)
  })

  it("renders 'No file uploaded' if documentId is undefined", () => {
    const { container } = render(
      <DownloadDocument {...props} documentId={undefined} />
    )

    expect(container).toHaveTextContent('No file uploaded')
  })

  it("renders 'No file uploaded' if ownerId is undefined", () => {
    const { container } = render(
      <DownloadDocument {...props} ownerId={undefined} />
    )

    expect(container).toHaveTextContent('No file uploaded')
  })
})
