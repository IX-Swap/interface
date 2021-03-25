import React from 'react'
import { render, cleanup } from 'test-utils'
import { UploadDocumentField } from 'app/pages/_identity/components/UploadDocumentsForm/UploadDocumentField/UploadDocumentField'
import { CorporateUploadDocumentsForm } from 'app/pages/_identity/components/UploadDocumentsForm/CorporateUploadDocumentsForm'

jest.mock(
  'app/pages/_identity/components/UploadDocumentsForm/UploadDocumentField/UploadDocumentField',
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
    render(<CorporateUploadDocumentsForm />)
  })

  it('renders Upload fields correctly for the investor', () => {
    render(<CorporateUploadDocumentsForm corporateType='investor' />)

    expect(UploadDocumentField).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        name: 'corporateDocuments',
        label: 'Corporate Documents'
      }),
      {}
    )

    expect(UploadDocumentField).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        name: 'financialDocuments',
        label: 'Financial Documents'
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

  it('renders Upload fields correctly for the issuer', () => {
    render(<CorporateUploadDocumentsForm corporateType='issuer' />)

    expect(UploadDocumentField).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        name: 'corporateDocuments',
        label: 'Corporate Documents'
      }),
      {}
    )

    expect(UploadDocumentField).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        name: 'financialDocuments',
        label: 'Financial Documents'
      }),
      {}
    )
  })
})
