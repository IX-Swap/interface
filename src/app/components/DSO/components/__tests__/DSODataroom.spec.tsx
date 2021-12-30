import React from 'react'
import { render } from 'test-utils'
import { DSODataroom } from 'app/components/DSO/components/DSODataroom'
import { Form } from 'components/form/Form'

describe('DSODataroom', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(
      <Form>
        <DSODataroom />
      </Form>
    )
  })
})
