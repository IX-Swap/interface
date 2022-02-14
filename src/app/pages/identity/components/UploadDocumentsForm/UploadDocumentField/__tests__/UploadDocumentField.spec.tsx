import React from 'react'
import { render } from 'test-utils'
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

  it('renders props correctly', () => {
    const { container, getByText, getByTitle } = render(
      <Form>
        <UploadDocumentField {...props} />
      </Form>
    )

    const inputField = container.querySelector('input') as HTMLInputElement
    expect(inputField.name).toEqual('proofOfIdentity')
    expect(getByText('Proof Of Identity')).toBeTruthy()
    expect(getByText('This is the proof.')).toBeTruthy()
    expect(getByTitle('This is a tooltip content')).toBeTruthy()
  })
})
