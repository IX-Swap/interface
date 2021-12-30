import React from 'react'
import { render } from 'test-utils'
import { UploadDocumentsForm } from 'app/pages/identity/components/UploadDocumentsForm/UploadDocumentsForm'

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
    render(
      <UploadDocumentsForm identityType='individual'>
        <div />
      </UploadDocumentsForm>
    )
  })
})
