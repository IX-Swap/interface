import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSODataroom } from 'v2/app/components/DSO/components/DSODataroom'
import { Form } from 'v2/components/form/Form'

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
