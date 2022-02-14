import { DocumentList } from 'app/pages/identity/components/UploadDocumentsForm/UploadDocumentField/DocumentList'
import { Form } from 'components/form/Form'
import React from 'react'
import { render } from 'test-utils'

describe('DocumentList', () => {
  afterEach(async () => {
    jest.clearAllMocks()
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
