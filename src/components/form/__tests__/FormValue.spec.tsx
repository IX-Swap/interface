import React from 'react'
import { render, cleanup } from 'test-utils'
import { FormValue } from 'components/form/FormValue'
import { Form } from 'components/form/Form'

describe('FormValue', () => {
  const props = { name: 'test-name', label: 'test label' }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form>
        <FormValue {...props} />
      </Form>
    )
  })
})
