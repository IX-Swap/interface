import React from 'react'
import { render, cleanup } from 'test-utils'
import { UploadDocumentField } from 'app/pages/identity/components/UploadDocumentsForm/UploadDocumentField/UploadDocumentField'
import { IndividualUploadDocumentsForm } from 'app/pages/identity/components/UploadDocumentsForm/IndividualUploadDocumentsForm'

jest.mock(
  'app/pages/identity/__tests__/UploadDocumentsForm/UploadDocumentField/UploadDocumentField',
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
        name: 'proofOfIdentity',
        label: 'Proof of Identity'
      }),
      {}
    )

    expect(UploadDocumentField).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        name: 'proofOfAddress',
        label: 'Proof of Address'
      }),
      {}
    )

    expect(UploadDocumentField).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        name: 'evidenceOfAccreditation',
        label: 'Evidence of Accreditation'
      }),
      {}
    )
  })
})
