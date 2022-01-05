import React from 'react'
import { render } from 'test-utils'
import {
  DocumentNamePreviewButton,
  DocumentNamePreviewButtonProps
} from 'app/pages/invest/components/DocumentNamePreviewButton'
import { document } from '__fixtures__/identity'

describe('DocumentNamePreviewButton', () => {
  const props: DocumentNamePreviewButtonProps = { value: document }

  afterEach(async () => {
    jest.clearAllMocks()
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
