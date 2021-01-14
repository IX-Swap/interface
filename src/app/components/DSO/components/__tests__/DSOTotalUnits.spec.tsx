import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSOTotalUnits } from 'app/components/DSO/components/DSOTotalUnits'
import { Form } from 'components/form/Form'

describe('DSOTotalUnits', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <DSOTotalUnits />
      </Form>
    )
  })
})
