import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSODataroom } from 'app/components/DSO/components/DSODataroom'
import { Form } from 'components/form/Form'

describe('DSODataroom', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form>
        <DSODataroom />
      </Form>
    )
  })
})
