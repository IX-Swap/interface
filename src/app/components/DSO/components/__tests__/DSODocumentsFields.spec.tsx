import React from 'react'
import { render } from 'test-utils'
import { DSODocumentsFields } from 'app/components/DSO/components/DSODocumentsFields'
import { Form } from 'components/form/Form'

describe('DSODocumentsFields', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders nothing if data is null', () => {
    const { container } = render(
      <Form>
        <DSODocumentsFields />
      </Form>
    )

    expect(container).toMatchSnapshot()
  })
})
