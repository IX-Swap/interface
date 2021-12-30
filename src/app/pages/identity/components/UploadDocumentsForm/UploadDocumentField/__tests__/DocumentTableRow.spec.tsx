import { DocumentTableRow } from 'app/pages/identity/components/UploadDocumentsForm/UploadDocumentField/DocumentTableRow'
import { Form } from 'components/form/Form'
import React from 'react'
import { render } from 'test-utils'
import { document } from '__fixtures__/identity'

describe('DocumentTableRow', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders null if document id is null', () => {
    const { container } = render(
      <Form>
        <DocumentTableRow
          name='proof'
          document={{ ...document, _id: undefined }}
        />
      </Form>
    )
    expect(container.firstChild).toBeEmptyDOMElement()
  })
})
