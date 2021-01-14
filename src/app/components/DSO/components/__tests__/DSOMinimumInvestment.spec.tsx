import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSOMinimumInvestment } from 'app/components/DSO/components/DSOMinimumInvestment'
import { Form } from 'components/form/Form'

describe('DSOMinimumInvestment', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <DSOMinimumInvestment />
      </Form>
    )
  })
})
