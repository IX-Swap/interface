import React from 'react'
import { fireEvent, render, waitFor } from 'test-utils'
import {
  UploadDocumentField,
  UploadDocumentFieldProps
} from 'app/pages/identity/components/UploadDocumentsForm/UploadDocumentField/UploadDocumentField'
import { Form } from 'components/form/Form'

describe('UploadDocumentField', () => {
  const props: UploadDocumentFieldProps = {
    name: 'proofOfIdentity',
    label: 'Proof Of Identity',
    helperElement: 'This is the proof.',
    tooltipContent: 'This is a tooltip content'
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders props correctly', async () => {
    const { getByText, getByTestId } = render(
      <Form defaultValues={{ proofOfIdentity: [{ value: {} }] }}>
        <UploadDocumentField {...props} />
      </Form>
    )

    expect(getByText('Proof Of Identity')).toBeTruthy()
    expect(getByText('This is the proof.')).toBeTruthy()

    fireEvent.mouseEnter(getByTestId('upload-document-field-tooltip'))

    await waitFor(() => {
      expect(getByText('This is a tooltip content'))
    })
  })
})
