import React from 'react'
import { render, cleanup } from 'test-utils'
import { UploadDocumentsForm } from 'app/pages/identity/components/UploadDocumentsForm/UploadDocumentsForm'
import { UploadDocumentField } from 'app/pages/identity/components/UploadDocumentsForm/UploadDocumentField/UploadDocumentField'

jest.mock(
  'app/pages/identity/components/UploadDocumentsForm/UploadDocumentField/UploadDocumentField',
  () => ({
    UploadDocumentField: jest.fn(() => null)
  })
)

describe('UploadDocumentsForm', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<UploadDocumentsForm />)
  })

  it('renders Upload fields correctly', () => {
    render(<UploadDocumentsForm />)

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
