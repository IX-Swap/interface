import { fireEvent } from '@testing-library/react'
import { ViewUploadedDocument } from 'app/pages/identity/components/UploadDocumentsForm/UploadDocumentField/ViewUploadedDocument'
import { Form } from 'components/form/Form'
import * as useAuth from 'hooks/auth/useAuth'
import * as useDownloadRawDocument from 'hooks/useDownloadRawDocument'
import React from 'react'
import { render } from 'test-utils'
import { document } from '__fixtures__/identity'
import { generateMutationResult } from '__fixtures__/useQuery'
import { user } from '__fixtures__/user'

describe('ViewUploadDocument', () => {
  const mutateFn = jest.fn()

  beforeEach(() => {
    const userObj = user

    jest.spyOn(useAuth, 'useAuth').mockImplementation(() => userObj as any)
    jest
      .spyOn(useDownloadRawDocument, 'useDownloadRawDocument')
      .mockImplementation(
        () =>
          [
            mutateFn,
            generateMutationResult({ data: {}, isLoading: false })
          ] as any
      )
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('handles download correctly', () => {
    const { container } = render(
      <Form>
        <ViewUploadedDocument documentId={document._id} />
      </Form>
    )

    const downloadButton = container.querySelector(
      'button'
    ) as HTMLButtonElement
    fireEvent.click(downloadButton, { bubbles: true, cancellable: true })
    expect(mutateFn).toHaveBeenCalled()
  })
})
