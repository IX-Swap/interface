import React from 'react'
import { render } from 'test-utils'
import { UploadDocumentField } from 'app/pages/identity/components/UploadDocumentsForm/UploadDocumentField/UploadDocumentField'
import { CorporateUploadDocumentsForm } from 'app/pages/identity/components/UploadDocumentsForm/CorporateUploadDocumentsForm'

jest.mock(
  'app/pages/identity/components/UploadDocumentsForm/UploadDocumentField/UploadDocumentField',
  () => ({
    UploadDocumentField: jest.fn(() => null)
  })
)

describe('IndividualUploadDocumentsForm', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
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
