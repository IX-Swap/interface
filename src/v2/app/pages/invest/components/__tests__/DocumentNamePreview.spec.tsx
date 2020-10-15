/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  DocumentNamePreview,
  DocumentNamePreviewProps
} from 'v2/app/pages/invest/components/DocumentNamePreview'
import { DocumentNamePreviewButton } from 'v2/app/pages/invest/components/DocumentNamePreviewButton'
import { Form } from 'v2/components/form/Form'

jest.mock('v2/app/pages/invest/components/DocumentNamePreviewButton', () => ({
  DocumentNamePreviewButton: jest.fn(() => null)
}))

describe('DocumentNamePreview', () => {
  const props: DocumentNamePreviewProps = {}
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form>
        <DocumentNamePreview {...props} />
      </Form>
    )
  })

  it('renders DocumentNamePreviewButton correctly', () => {
    render(
      <Form>
        <DocumentNamePreview {...props} />
      </Form>
    )

    expect(DocumentNamePreviewButton).toHaveBeenCalledTimes(1)
  })
})
