/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  DocumentNamePreview,
  DocumentNamePreviewProps
} from 'v2/app/pages/invest/components/DocumentNamePreview'
import { Form } from 'v2/components/form/Form'

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
})
