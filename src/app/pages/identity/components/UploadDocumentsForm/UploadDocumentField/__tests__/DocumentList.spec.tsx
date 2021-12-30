import { DocumentList } from 'app/pages/identity/components/UploadDocumentsForm/UploadDocumentField/DocumentList'
import { Form } from 'components/form/Form'
import React from 'react'
import { render } from 'test-utils'

describe('DocumentList', () => {
  const documents = [
    { ...document, _id: '1' },
    { ...document, _id: '2' }
  ]

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(
      <Form defaultValues={{ proof: documents }}>
        <DocumentList name='proof' />
      </Form>
    )
  })

  it('renders null when there are no documents', () => {
    const { container } = render(
      <Form defaultValues={{ proof: [] }}>
        <DocumentList name='proof' />
      </Form>
    )

    expect(container.firstChild).toBeEmptyDOMElement()
  })
})
