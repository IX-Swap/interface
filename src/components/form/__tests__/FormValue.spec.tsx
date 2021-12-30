import React from 'react'
import { render } from 'test-utils'
import { FormValue } from 'components/form/FormValue'
import { Form } from 'components/form/Form'

describe('FormValue', () => {
  const props = { name: 'test-name', label: 'test label' }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(
      <Form>
        <FormValue {...props} />
      </Form>
    )
  })
})
