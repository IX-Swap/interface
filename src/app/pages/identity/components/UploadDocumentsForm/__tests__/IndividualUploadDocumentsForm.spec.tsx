import React from 'react'
import { render } from 'test-utils'
import { IndividualUploadDocumentsForm } from 'app/pages/identity/components/UploadDocumentsForm/IndividualUploadDocumentsForm'
import { Form } from 'components/form/Form'

window.URL.revokeObjectURL = jest.fn()

describe('CorporateIdentityView', () => {
  it('should match snapshot', () => {
    const { container } = render(
      <Form>
        <IndividualUploadDocumentsForm />
      </Form>
    )
    expect(container).toMatchSnapshot()
  })
})
