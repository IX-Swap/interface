import React from 'react'
import { render, cleanup } from 'test-utils'
import { UploadDocumentsForm } from 'app/pages/identity/components/UploadDocumentsForm/UploadDocumentsForm'

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
    render(
      <UploadDocumentsForm identityType='individual'>
        <div />
      </UploadDocumentsForm>
    )
  })
})
