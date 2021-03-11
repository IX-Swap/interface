import React from 'react'
import { render, cleanup } from 'test-utils'
import { UploadDocumentField } from 'app/pages/_identity/components/UploadDocumentsForm/UploadDocumentField/UploadDocumentField'
import { IndividualUploadDocumentsForm } from 'app/pages/_identity/components/UploadDocumentsForm/IndividualUploadDocumentsForm'

jest.mock(
  'app/pages/identity/components/UploadDocumentsForm/UploadDocumentField/UploadDocumentField',
  () => ({
    UploadDocumentField: jest.fn(() => null)
  })
)

describe('IndividualUploadDocumentsForm', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<IndividualUploadDocumentsForm />)
  })

  it('renders Upload fields correctly', () => {
    render(<IndividualUploadDocumentsForm />)

    expect(UploadDocumentField).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        name: 'documents.proofOfIdentity',
        label: 'Proof of Identity'
      }),
      {}
    )

    expect(UploadDocumentField).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        name: 'documents.proofOfAddress',
        label: 'Proof of Address'
      }),
      {}
    )

    expect(UploadDocumentField).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        name: 'documents.evidenceOfAccreditation',
        label: 'Evidence of Accreditation'
      }),
      {}
    )
  })
})
