import { IssuerDocuments } from 'app/pages/identity/components/IssuerDocuments/IssuerDocuments'
import { Form } from 'components/form/Form'
import React from 'react'
import { render } from 'test-utils'

describe('IssuerDocuments', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(
      <Form>
        <IssuerDocuments />
      </Form>
    )
  })
})
