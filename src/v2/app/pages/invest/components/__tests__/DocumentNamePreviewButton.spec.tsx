import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  DocumentNamePreviewButton,
  DocumentNamePreviewButtonProps
} from 'v2/app/pages/invest/components/DocumentNamePreviewButton'
import { document } from '__fixtures__/identity'

describe('DocumentNamePreviewButton', () => {
  const props: DocumentNamePreviewButtonProps = { value: document }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DocumentNamePreviewButton {...props} />)
  })

  it('renders correctly if value is undefined', () => {
    const { container } = render(<DocumentNamePreviewButton />)

    expect(container).toHaveTextContent(
      'Upload Signed Subscription Document'.toUpperCase()
    )
  })

  it('renders correctly if value exist', () => {
    const { container } = render(<DocumentNamePreviewButton {...props} />)

    expect(container).toHaveTextContent(document.originalFileName)
  })
})
