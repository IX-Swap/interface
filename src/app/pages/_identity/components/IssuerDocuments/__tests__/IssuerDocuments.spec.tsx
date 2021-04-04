import { IssuerDocuments } from 'app/pages/_identity/components/IssuerDocuments/IssuerDocuments'
import { Form } from 'components/form/Form'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('IssuerDocuments', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <IssuerDocuments />
      </Form>
    )
  })
})
