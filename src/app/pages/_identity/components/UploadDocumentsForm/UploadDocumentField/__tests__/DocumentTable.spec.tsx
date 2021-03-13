import {
  DocumentTable,
  DocumentTableProps
} from 'app/pages/_identity/components/UploadDocumentsForm/UploadDocumentField/DocumentTable'
import { Form } from 'components/form/Form'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { document } from '__fixtures__/identity'
import { DocumentTableRow } from 'app/pages/_identity/components/UploadDocumentsForm/UploadDocumentField/DocumentTableRow'

jest.mock(
  'app/pages/identity/components/UploadDocumentsForm/UploadDocumentField/DocumentTableRow',
  () => ({
    DocumentTableRow: jest.fn(() => null)
  })
)

describe('DocumentTable', () => {
  const props: DocumentTableProps = {
    name: 'proof',
    documents: [
      { ...document, _id: '1' },
      { ...document, _id: '2' }
    ]
  }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <DocumentTable {...props} />
      </Form>
    )
  })

  it('renders document lists correctly', () => {
    render(
      <Form>
        <DocumentTable {...props} />
      </Form>
    )

    expect(DocumentTableRow).toHaveBeenNthCalledWith(
      1,
      {
        name: 'proof',
        document: props.documents[0]
      },
      {}
    )

    expect(DocumentTableRow).toHaveBeenNthCalledWith(
      2,
      {
        name: 'proof',
        document: props.documents[1]
      },
      {}
    )
  })
})
